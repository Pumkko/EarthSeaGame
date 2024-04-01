import { For, Show } from "solid-js";

export type TimelineEvents = {
    date: string;
    eventId: string;
    event: string;
    eventDetails: string;
};

export interface TimelineItemProps {
    event: TimelineEvents;
    isFirst: boolean;
    isLast: boolean;
}

export function TimelineItem(props: TimelineItemProps) {
    const dialogId = () => `event_description_dialog_${props.event.eventId}`;

    const onClick = () => {
        const m = document.getElementById(dialogId()) as HTMLDialogElement;
        m?.showModal();
    };

    return (
        <>
            <dialog id={dialogId()} class="modal text-black">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">En Détail</h3>
                    <p class="py-4">{props.event.eventDetails}</p>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <li>
                <Show when={!props.isFirst}>
                    <hr />
                </Show>
                <div class="timeline-start">{props.event.date}</div>
                <div class="timeline-middle rounded-full border-white border-2 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 ">
                        <path
                            fill-rule="evenodd"
                            d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                            clip-rule="evenodd"
                        />
                        <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                    </svg>
                </div>

                <div class="timeline-end timeline-box text-black cursor-pointer" onClick={onClick}>
                    {props.event.event}
                </div>
                <Show when={!props.isLast}>
                    <hr />
                </Show>
            </li>
        </>
    );
}

export interface TimelineProps {
    events: TimelineEvents[];
}

export function Timeline(props: TimelineProps) {
    return (
        <ul class="timeline">
            <For each={props.events}>
                {(e, i) => <TimelineItem event={e} isFirst={i() === 0} isLast={i() === props.events.length - 1} />}
            </For>
        </ul>
    );
}
