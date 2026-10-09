import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, CalendarDays, ImagePlus } from 'lucide-react';
import type { FormEvent } from 'react';

type EventItem = {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    location: string;
    start_date: string;
    end_date: string | null;
    capacity: number;
    status: string;
};

type Props = {
    event: EventItem;
};

type EventForm = {
    title: string;
    description: string;
    image: File | null;
    location: string;
    start_date: string;
    end_date: string;
    capacity: number;
    status: string;
    _method: 'put';
};

export default function EditEvent({ event }: Props) {
    const formatDateTime = (value: string | null) => {
        if (!value) return '';

        const date = new Date(value);
        const localDate = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000,
        );

        return localDate.toISOString().slice(0, 16);
    };

    const { data, setData, post, processing, errors } = useForm<EventForm>({
        title: event.title,
        description: event.description ?? '',
        image: null,
        location: event.location,
        start_date: formatDateTime(event.start_date),
        end_date: formatDateTime(event.end_date),
        capacity: event.capacity,
        status: event.status,
        _method: 'put',
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(`/events/${event.id}`, {
            forceFormData: true,
        });
    }

    const inputClass =
        'mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary';

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Events', href: '/events' },
        { title: 'Edit Event', href: `/events/${event.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${event.title}`} />

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
                            <CalendarDays className="size-7 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Edit Event
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Update your event details and cover image.
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
                            required
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="text-sm font-medium"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className={inputClass}
                            rows={4}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="image"
                            className="flex items-center gap-2 text-sm font-medium"
                        >
                            <ImagePlus className="size-4" />
                            Event Cover Image
                        </label>

                        {event.image && (
                            <div className="mt-3">
                                <p className="mb-2 text-xs text-muted-foreground">
                                    Current image
                                </p>
                                <img
                                    src={`/storage/${event.image}`}
                                    alt={event.title}
                                    className="h-48 w-full max-w-md rounded-xl border object-cover"
                                />
                            </div>
                        )}

                        <input
                            id="image"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                            className="mt-3 block w-full cursor-pointer rounded-lg border border-input bg-background p-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
                        />

                        <p className="mt-2 text-xs text-muted-foreground">
                            JPG, JPEG, PNG or WEBP. Maximum size: 2 MB.
                            Leave empty to keep the current image.
                        </p>

                        {data.image && (
                            <p className="mt-2 text-sm text-green-600">
                                Selected: {data.image.name}
                            </p>
                        )}

                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image}
                            </p>
                        )}
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
                            required
                        />
                        {errors.location && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.location}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="start_date"
                                className="text-sm font-medium"
                            >
                                Start Date &amp; Time *
                            </label>
                            <input
                                id="start_date"
                                type="datetime-local"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData('start_date', e.target.value)
                                }
                                className={inputClass}
                                required
                            />
                            {errors.start_date && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.start_date}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="end_date"
                                className="text-sm font-medium"
                            >
                                End Date &amp; Time
                            </label>
                            <input
                                id="end_date"
                                type="datetime-local"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData('end_date', e.target.value)
                                }
                                className={inputClass}
                            />
                            {errors.end_date && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="capacity"
                                className="text-sm font-medium"
                            >
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
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.capacity}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="text-sm font-medium"
                            >
                                Event Status *
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className={inputClass}
                                required
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.status}
                                </p>
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
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

