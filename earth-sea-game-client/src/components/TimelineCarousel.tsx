import { Show, batch, createEffect, createSignal } from "solid-js";
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
        events: [],
    });

    const [currentEvents, setCurrentEvents] = createSignal<CarouselTimelineEvent>();

    createEffect(() => {
        const images = props.events.map((v, i) => {
            return {
                isDisplayed: i === 0,
                events: v.events,
                imagePath: v.imagePath,
            };
        });
        setImages({
            events: images,
        });

        setCurrentEvents(images[0]);
    });

    const [currentAnimationClass, setCurrentAnimationClass] = createSignal<
        "slide-in-fwd-left" | "slide-out-fwd-right" | "slide-in-fwd-right" | "slide-out-fwd-left"
    >("slide-in-fwd-left");

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
        setCurrentAnimationClass("slide-out-fwd-left");

        setTimeout(() => {
            setCurrentEvents(imageStore.events[nextIndex]);
            setCurrentAnimationClass("slide-in-fwd-right");
        }, 1000);
    };

    const onPrevious = () => {
        const currentIndex = imageStore.events.findIndex((i) => i.isDisplayed);
        const nextIndex = currentIndex - 1 < 0 ? imageStore.events.length - 1 : currentIndex - 1;

        batch(() => {
            setImages("events", currentIndex, {
                isDisplayed: false,
            });

            setImages("events", nextIndex, {
                isDisplayed: true,
            });
        });
        setCurrentAnimationClass("slide-out-fwd-right");

        setTimeout(() => {
            setCurrentEvents(imageStore.events[nextIndex]);
            setCurrentAnimationClass("slide-in-fwd-left");
        }, 1000);
    };

    return (
        <Show when={!!currentEvents()}>
            <div class="w-full h-full flex flex-col overflow-hidden mt-8">
                <img
                    class={`${currentAnimationClass()} object-contain h-auto w-auto max-h-[75%] max-w-full`}
                    src={currentEvents()!.imagePath}
                />

                <div class="flex justify-around">
                    <ArrowLeftCircle
                        onClick={onPrevious}
                        class="w-12 h-12 self-center hover:opacity-50 cursor-pointer duration-500"
                    />
                    <div class={`${currentAnimationClass()} w-4/5 overflow-x-auto flex justify-center`}>
                        <Timeline events={currentEvents()!.events} />
                    </div>
                    <ArrowRightCircle
                        onclick={onNext}
                        class="w-12 h-12 self-center hover:opacity-50 cursor-pointer duration-500"
                    />
                </div>
            </div>
        </Show>
    );
}
