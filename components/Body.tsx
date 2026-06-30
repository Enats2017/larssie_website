import Navbar from "./NavbarBrand";
import Hero from "./Hero";
import WorldMap from "./WorldMap";
import EventsCards from "./EventsCards";
import Partners from "./Partners";
import SideDock from "./SideDock";

export default function Home(): JSX.Element {
  return (
    <div className="relative">

     <SideDock />
      {/* Navbar Over Video */}
      <div className="absolute top-0 left-0 w-full z-50 p-4">
        <Navbar />
      </div>

      {/* Hero Video */}
      <Hero />
      <WorldMap />
      <EventsCards/>
      {/* <Partners /> */}
    </div>
  );
}