import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
CalendarDays,
Clock,
CheckCircle2,
XCircle,
Plus,
ArrowRight,
MapPin,
Users,
Activity,
} from 'lucide-react';

type EventItem = {
id: number;
title: string;
location: string;
start_date: string;
status: string;
};

type DashboardStats = {
total: number;
upcoming: number;
ongoing: number;
completed: number;
cancelled: number;
};

type Props = {
stats?: DashboardStats;
recentEvents?: EventItem[];
};

const breadcrumbs: BreadcrumbItem[] = [
{
title: 'Dashboard',
href: '/dashboard',
},
];

export default function Dashboard({ stats, recentEvents }: Props) {
const data: DashboardStats = stats ?? {
total: 0,
upcoming: 0,
ongoing: 0,
completed: 0,
cancelled: 0,
};


const events = recentEvents ?? [];

const cards = [
    {
        title: 'Total Events',
        value: data.total,
        icon: CalendarDays,
        description: 'All your events',
        iconStyle: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
        title: 'Upcoming',
        value: data.upcoming,
        icon: Clock,
        description: 'Events coming soon',
        iconStyle: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    },
    {
        title: 'Ongoing',
        value: data.ongoing,
        icon: Activity,
        description: 'Currently in progress',
        iconStyle: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    },
    {
        title: 'Completed',
        value: data.completed,
        icon: CheckCircle2,
        description: 'Successfully completed',
        iconStyle: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
];

const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const statusStyle: Record<string, string> = {
    upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    ongoing: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />

        <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        EVENT MANAGEMENT SYSTEM
                    </p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Welcome back! Here is an overview of your events.
                    </p>
                </div>

                <Link
                    href="/events/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                    <Plus className="size-4" />
                    Create Event
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </p>
                                    <p className="mt-3 text-3xl font-bold tracking-tight">
                                        {card.value}
                                    </p>
                                </div>

                                <div className={`rounded-xl p-3 ${card.iconStyle}`}>
                                    <Icon className="size-5" />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border bg-card p-5 shadow-sm xl:col-span-2 md:p-6">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Recent Events
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                A quick look at your latest events.
                            </p>
                        </div>

                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                            View all events
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    {events.length > 0 ? (
                        <div className="mt-5 divide-y">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                                >
                                    <div className="min-w-0">
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="font-medium hover:text-primary hover:underline"
                                        >
                                            {event.title}
                                        </Link>

                                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="size-3.5" />
                                                {event.location}
                                            </span>

                                            <span className="inline-flex items-center gap-1">
                                                <CalendarDays className="size-3.5" />
                                                {formatDate(event.start_date)}
                                            </span>
                                        </div>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                                            statusStyle[event.status] ??
                                            'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {event.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed px-4 py-12 text-center">
                            <CalendarDays className="size-10 text-muted-foreground/60" />
                            <h3 className="mt-4 font-semibold">
                                No recent events
                            </h3>
                            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                Create your first event to start managing
                                your events here.
                            </p>
                            <Link
                                href="/events/create"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                            >
                                <Plus className="size-4" />
                                Create your first event
                            </Link>
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
                    <h2 className="text-lg font-semibold">
                        Quick Actions
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your events easily.
                    </p>

                    <div className="mt-5 space-y-3">
                        <Link
                            href="/events/create"
                            className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted"
                        >
                            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                                <Plus className="size-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">
                                    Create Event
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Add a new event
                                </p>
                            </div>
                            <ArrowRight className="size-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/events"
                            className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-muted"
                        >
                            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                <CalendarDays className="size-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">
                                    Manage Events
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    View, edit and delete events
                                </p>
                            </div>
                            <ArrowRight className="size-4 text-muted-foreground" />
                        </Link>

                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <div className="rounded-lg bg-purple-100 p-2.5 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                <Users className="size-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">
                                    Event Capacity
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {data.total} event(s) in your system
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <div className="rounded-lg bg-red-100 p-2.5 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                <XCircle className="size-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">
                                    Cancelled Events
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {data.cancelled} cancelled
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-muted/30 px-5 py-4">
                <p className="text-sm font-medium">
                    EventFlow
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Your events, organized in one place.
                </p>
            </div>
        </div>
    </AppLayout>
);


}
