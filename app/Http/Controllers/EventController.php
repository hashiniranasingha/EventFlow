<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Event::where('user_id', $request->user()->id);

        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $events = $query->latest('start_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('events/index', [
            'events' => $events,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('events/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'location' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'capacity' => ['required', 'integer', 'min:1', 'max:1000000'],
            'status' => ['required', 'in:upcoming,ongoing,completed,cancelled'],
        ]);

        $image = $request->file('image');
        unset($validated['image']);

        if ($image) {
            $validated['image'] = $image->store('events', 'public');
        }

        $request->user()->events()->create($validated);

        return redirect()->route('events.index')
            ->with('success', 'Event created successfully.');
    }

    public function show(Event $event): Response
    {
        $this->authorizeEvent($event);

        return Inertia::render('events/show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event): Response
    {
        $this->authorizeEvent($event);

        return Inertia::render('events/edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $this->authorizeEvent($event);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'location' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'capacity' => ['required', 'integer', 'min:1', 'max:1000000'],
            'status' => ['required', 'in:upcoming,ongoing,completed,cancelled'],
        ]);

        $image = $request->file('image');
        unset($validated['image']);

        $oldImage = $event->image;

        if ($image) {
            $validated['image'] = $image->store('events', 'public');
        }

        $event->update($validated);

        if ($image && $oldImage) {
            Storage::disk('public')->delete($oldImage);
        }

        return redirect()->route('events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->authorizeEvent($event);

        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully.');
    }

    private function authorizeEvent(Event $event): void
    {
        abort_unless(
            (int) $event->user_id === (int) auth()->id(),
            403,
            'You are not allowed to access this event.'
        );
    }
}

