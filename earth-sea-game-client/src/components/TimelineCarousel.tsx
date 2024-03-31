import { batch, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { ArrowLeftCircle, ArrowRightCircle } from "./ArrowCircle";
import { Timeline, TimelineEvents } from "./Timeline";

interface CarouselTimelineEvent {
    imagePath: string;
    events: TimelineEvents[];
    isDisplayed: boolean;
}

type CarouselTimelineEventProps = Pick<CarouselTimelineEvent, "events" | "imagePath">;

export default function TimelineCarousel(props: { events: CarouselTimelineEventProps[] }) {
    const [imageStore, setImages] = createStore<{
        events: CarouselTimelineEvent[];
    }>({
        events: props.events.map((v, i) => {
            return {
                isDisplayed: i === 0,
                events: v.events,
                imagePath: v.imagePath,
            };
        }),
    });

    const [currentEvents, setCurrentEvents] = createSignal<CarouselTimelineEvent>(imageStore.events[0]);

    const onNext = () => {
        const currentIndex = imageStore.events.findIndex((i) => i.isDisplayed);
        const nextIndex = currentIndex + 1 >= imageStore.events.length ? 0 : currentIndex + 1;

        batch(() => {
            setImages("events", currentIndex, {
                isDisplayed: false,
            });

            setImages("events", nextIndex, {
                isDisplayed: true,
            });
        });

        setTimeout(() => {
            setCurrentEvents(imageStore.events[nextIndex]);
        }, 1000);
    };

    return (
        <div class="w-full h-full flex flex-col overflow-hidden">
            <img
                class={`${
                    currentEvents().isDisplayed ? "slide-in-fwd-left" : "slide-out-fwd-right"
                } h-auto w-auto max-h-[75%] max-w-full`}
                src={currentEvents().imagePath}
            />

            <div class="flex justify-around">
                <ArrowLeftCircle
                    onClick={onNext}
                    class="w-12 h-12 self-center hover:opacity-50 cursor-pointer duration-500"
                />
                <div
                    class={`${
                        currentEvents().isDisplayed ? "slide-in-fwd-left" : "slide-out-fwd-right"
                    } w-4/5 overflow-x-auto flex justify-center`}
                >
                    <Timeline events={currentEvents().events} />
                </div>
                <ArrowRightCircle
                    onclick={onNext}
                    class="w-12 h-12 self-center hover:opacity-50 cursor-pointer duration-500"
                />
            </div>
        </div>
    );
}
