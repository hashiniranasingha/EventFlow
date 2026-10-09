<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;
use App\Http\Controllers\EventController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $userId = $request->user()->id;

        $stats = [
            'total' => Event::where('user_id', $userId)->count(),

            'upcoming' => Event::where('user_id', $userId)
                ->where('status', 'upcoming')
                ->count(),

            'ongoing' => Event::where('user_id', $userId)
                ->where('status', 'ongoing')
                ->count(),

            'completed' => Event::where('user_id', $userId)
                ->where('status', 'completed')
                ->count(),

            'cancelled' => Event::where('user_id', $userId)
                ->where('status', 'cancelled')
                ->count(),
        ];

        $recentEvents = Event::where('user_id', $userId)
            ->latest('start_date')
            ->take(5)
            ->get([
                'id',
                'title',
                'location',
                'start_date',
                'status',
            ]);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentEvents' => $recentEvents,
        ]);
    })->name('dashboard');

    Route::resource('events', EventController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';