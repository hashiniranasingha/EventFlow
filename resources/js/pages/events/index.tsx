import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    CalendarDays,
    MapPin,
    Plus,
    Search,
    Pencil,
    Trash2,
    ImagePlus,
} from 'lucide-react';

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

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    events: {
        data: EventItem[];
        links: PaginationLink[];
        total: number;
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Events', href: '/events' },
];

export default function EventsIndex({ events, filters }: Props) {
    function deleteEvent(id: number) {
        if (window.confirm('Are you sure you want to delete this event?')) {
            router.delete(`/events/${id}`);
        }
    }

    function statusStyle(status: string) {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
            case 'ongoing':
                return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
            case 'completed':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'cancelled':
                return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Create, manage and track your events.
                        </p>
                    </div>

                    <Link
                        href="/events/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        <Plus className="size-4" />
                        Create Event
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Events</p>
                                <p className="mt-2 text-3xl font-bold">{events.total}</p>
                            </div>
                            <div className="rounded-lg bg-primary/10 p-3">
                                <CalendarDays className="size-6 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <p className="text-sm text-muted-foreground">Current Page</p>
                        <p className="mt-2 text-3xl font-bold">
                            {events.current_page}{' '}
                            <span className="text-lg text-muted-foreground">
                                / {events.last_page}
                            </span>
                        </p>
                    </div>
                </div>

                <form
                    action="/events"
                    method="get"
                    className="flex flex-col gap-3 rounded-xl border bg-card p-4 md:flex-row"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            name="search"
                            defaultValue={filters.search ?? ''}
                            placeholder="Search by event name or location..."
                            className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <select
                        name="status"
                        defaultValue={filters.status ?? ''}
                        className="rounded-lg border bg-background px-3 py-2.5 text-sm"
                    >
                        <option value="">All statuses</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                        type="submit"
                        className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                    >
                        Search
                    </button>

                    <Link
                        href="/events"
                        className="rounded-lg border px-5 py-2.5 text-center text-sm font-medium transition hover:bg-muted"
                    >
                        Reset
                    </Link>
                </form>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="border-b px-5 py-4">
                        <h2 className="font-semibold">Your Events</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {events.total} event(s) found
                        </p>
                    </div>

                    {events.data.length === 0 ? (
                        <div className="flex flex-col items-center px-5 py-16 text-center">
                            <CalendarDays className="mb-4 size-12 text-muted-foreground/50" />
                            <h3 className="text-lg font-semibold">No events found</h3>
                            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                Create your first event or change your search filters.
                            </p>
                            <Link
                                href="/events/create"
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                            >
                                <Plus className="size-4" />
                                Create your first event
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {events.data.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col gap-4 p-5 transition hover:bg-muted/30 md:flex-row md:items-center md:justify-between"
                                >
                                    <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="block w-full shrink-0 sm:w-44"
                                        >
                                            {event.image ? (
                                                <img
                                                    src={`/storage/${event.image}`}
                                                    alt={event.title}
                                                    className="h-40 w-full rounded-xl border object-cover sm:h-28"
                                                />
                                            ) : (
                                                <div className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/40 text-muted-foreground sm:h-28">
                                                    <ImagePlus className="size-7" />
                                                    <span className="text-xs">No image added</span>
                                                </div>
                                            )}
                                        </Link>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-lg font-semibold">
                                                    {event.title}
                                                </h3>
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyle(event.status)}`}
                                                >
                                                    {event.status}
                                                </span>
                                            </div>

                                            {event.description && (
                                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                                    {event.description}
                                                </p>
                                            )}

                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <MapPin className="size-4" />
                                                    {event.location}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <CalendarDays className="size-4" />
                                                    {new Date(event.start_date).toLocaleString()}
                                                </span>
                                                <span>Capacity: {event.capacity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 flex-wrap gap-2">
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/events/${event.id}/edit`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                                        >
                                            <Pencil className="size-4" />
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => deleteEvent(event.id)}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                                        >
                                            <Trash2 className="size-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {events.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 border-t p-4">
                            {events.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '/events'}
                                    preserveScroll
                                    className={`rounded-md border px-3 py-2 text-sm ${
                                        link.active
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : link.url
                                              ? 'hover:bg-muted'
                                              : 'cursor-not-allowed opacity-40'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

