import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    MapPin,
    Users,
    Pencil,
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

type Props = {
    event: EventItem;
};

export default function ShowEvent({ event }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Events', href: '/events' },
        { title: event.title, href: `/events/${event.id}` },
    ];

    const formattedDate = (value: string | null) => {
        if (!value) return 'Not specified';

        return new Date(value).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const statusColors: Record<string, string> = {
        upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        ongoing: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
        completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />

            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <Link
                            href="/events"
                            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Events
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight">
                            {event.title}
                        </h1>

                        <div className="mt-3">
                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                                    statusColors[event.status] ??
                                    'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {event.status}
                            </span>
                        </div>
                    </div>

                    <Link
                        href={`/events/${event.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    >
                        <Pencil className="size-4" />
                        Edit Event
                    </Link>
                </div>

                {/* Event Cover Image */}
                <div className="overflow-hidden rounded-2xl border bg-card">
                    {event.image ? (
                        <img
                            src={`/storage/${event.image}`}
                            alt={event.title}
                            className="max-h-[450px] w-full object-cover"
                        />
                    ) : (
                        <div className="flex min-h-56 flex-col items-center justify-center gap-3 bg-muted/40 p-8 text-muted-foreground">
                            <ImagePlus className="size-12" />
                            <p className="text-sm">No cover image added yet</p>
                            <Link
                                href={`/events/${event.id}/edit`}
                                className="rounded-lg border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                            >
                                Add Event Image
                            </Link>
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border bg-card p-6 md:p-8">
                    <div className="mb-6 border-b pb-5">
                        <h2 className="text-xl font-semibold">
                            Event Information
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Complete details for this event.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                                <MapPin className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Location
                                </p>
                                <p className="mt-1 font-medium">
                                    {event.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                                <CalendarDays className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Start Date &amp; Time
                                </p>
                                <p className="mt-1 font-medium">
                                    {formattedDate(event.start_date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                                <Clock className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    End Date &amp; Time
                                </p>
                                <p className="mt-1 font-medium">
                                    {formattedDate(event.end_date)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-primary/10 p-3">
                                <Users className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Maximum Capacity
                                </p>
                                <p className="mt-1 font-medium">
                                    {event.capacity} people
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold">Description</h3>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                            {event.description ||
                                'No description provided for this event.'}
                        </p>
                    </div>
                </div>

                <div>
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                        <ArrowLeft className="size-4" />
                        Return to Events List
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

