import Image from "@/components/image";
import Carousel from "nuka-carousel";

type CarouselNextProps = {
  image: string[];
  autoplay?: boolean;
  wrapAround?: boolean;
  showNextPrevButton?: boolean;
};

const CarouselNext = ({ image, autoplay, wrapAround, showNextPrevButton }: CarouselNextProps) => {
  const style = {
    nextButtonStyle: { display: showNextPrevButton ? "block" : "none" },
    prevButtonStyle: { display: showNextPrevButton ? "block" : "none" },
    pagingDotsContainerClassName: "gap-4",
  };

  return (
    <Carousel wrapAround={wrapAround} autoplay={autoplay} defaultControlsConfig={style}>
      {image?.map((img, i) => (
        <div key={i} className="relative h-[500px] w-full bg-black/10 brightness-75 lg:h-[65vh]">
          <Image src={img} style={{ objectFit: "cover" }} alt="" key={i} fill />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselNext;
