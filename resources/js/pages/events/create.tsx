
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, CalendarPlus, ImagePlus } from 'lucide-react';
import type { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Events', href: '/events' },
    { title: 'Create Event', href: '/events/create' },
];

type EventForm = {
    title: string;
    description: string;
    image: File | null;
    location: string;
    start_date: string;
    end_date: string;
    capacity: number;
    status: string;
};

export default function CreateEvent() {
    const { data, setData, post, processing, errors } = useForm<EventForm>({
        title: '',
        description: '',
        image: null,
        location: '',
        start_date: '',
        end_date: '',
        capacity: 100,
        status: 'upcoming',
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/events', {
            forceFormData: true,
        });
    }

    const inputClass =
        'mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Event" />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 md:p-8">
                <div>
                    <Link
                        href="/events"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Events
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primary/10 p-3">
                            <CalendarPlus className="size-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Add the details for your new event.
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                    className="space-y-6 rounded-xl border bg-card p-5 md:p-8"
                >
                    <div>
                        <label htmlFor="title" className="text-sm font-medium">
                            Event Title *
                        </label>
                        <input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Annual Tech Conference"
                            required
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={inputClass}
                            rows={4}
                            placeholder="Describe your event..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="image" className="text-sm font-medium">
                            Event Image (Optional)
                        </label>

                        <div className="mt-2 rounded-xl border border-dashed border-input p-5">
                            <label
                                htmlFor="image"
                                className="flex cursor-pointer flex-col items-center gap-2 text-center"
                            >
                                <ImagePlus className="size-9 text-primary" />
                                <span className="text-sm font-medium">
                                    Click to select an event image
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    JPG, JPEG, PNG or WEBP · Maximum 2 MB
                                </span>
                            </label>

                            <input
                                id="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) =>
                                    setData('image', e.target.files?.[0] ?? null)
                                }
                                className="mt-4 w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:font-medium file:text-primary hover:file:bg-primary/20"
                            />

                            {data.image && (
                                <p className="mt-3 break-all text-sm text-muted-foreground">
                                    Selected: {data.image.name}
                                </p>
                            )}

                            {errors.image && (
                                <p className="mt-2 text-sm text-red-500">{errors.image}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="location" className="text-sm font-medium">
                            Location *
                        </label>
                        <input
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Colombo, Sri Lanka"
                            required
                        />
                        {errors.location && (
                            <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                        )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label htmlFor="start_date" className="text-sm font-medium">
                                Start Date &amp; Time *
                            </label>
                            <input
                                id="start_date"
                                type="datetime-local"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className={inputClass}
                                required
                            />
                            {errors.start_date && (
                                <p className="mt-1 text-sm text-red-500">{errors.start_date}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="end_date" className="text-sm font-medium">
                                End Date &amp; Time
                            </label>
                            <input
                                id="end_date"
                                type="datetime-local"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className={inputClass}
                            />
                            {errors.end_date && (
                                <p className="mt-1 text-sm text-red-500">{errors.end_date}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label htmlFor="capacity" className="text-sm font-medium">
                                Maximum Capacity *
                            </label>
                            <input
                                id="capacity"
                                type="number"
                                min="1"
                                max="1000000"
                                value={data.capacity}
                                onChange={(e) =>
                                    setData('capacity', Number(e.target.value))
                                }
                                className={inputClass}
                                required
                            />
                            {errors.capacity && (
                                <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="status" className="text-sm font-medium">
                                Event Status *
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className={inputClass}
                                required
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-500">{errors.status}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse justify-end gap-3 border-t pt-5 sm:flex-row">
                        <Link
                            href="/events"
                            className="rounded-lg border px-5 py-2.5 text-center text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}