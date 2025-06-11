import { Button } from "../ui/button";
import Title from "./title";

export default function Banner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-primary w-full overflow-hidden">
      <div className="flex flex-col justify-center text-secondary px-5 md:pl-16 md:pr-0 py-20 md:py-40">
        <span className="text-xl font-semibold mb-2">New</span>
        <Title level={1} className="mb-4">
          Discover <br />
          Design Proposals
        </Title>
        <p className="text-lg md:text-2xl mb-6 max-w-lg font-light">
          Explore, refine, visualize—right inside your modeling tool. Now
          available for SketchUp.
        </p>
        <Button className="bg-accent w-max">Get Started</Button>
      </div>
      <div className="flex items-center justify-center">
        <video
          src="https://assets.lumion.com/f/180614/x/e144dd01b2/mediterranean-villa-slow-pan.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="https://placehold.co/400x400?text=Banner+Video"
        />
      </div>
    </section>
  );
}
