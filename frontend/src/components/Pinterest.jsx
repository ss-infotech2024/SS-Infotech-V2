// Pinterest.jsx
import Masonry from "../ui/Masonry";

const items = [
  {id:"1",img: "/images/adapance.jpg", url: "#", height: 650},
  {id:"2",img:"/images/fieldExpert.jpg", url:"#",height: 400},
  { id: "5", img: "/images/i2.jpg", url: "#", height: 400 },
  { id: "7", img: "/images/i4.jpg", url: "#", height: 450 },
  { id: "8", img: "/images/i5.jpg", url: "#", height: 800 },
  { id: "10", img: "/images/i7.jpg", url: "#", height: 300 },
  { id: "12", img: "/images/i9.jpg", url: "#", height: 460 },
  { id: "14", img: "/images/i11.jpg", url: "#", height: 400 },
  { id: "15", img: "/images/i12.jpg", url: "#", height: 400 },
  { id: "9", img: "/images/i6.jpg", url: "#", height: 660 },
  { id: "17", img: "/images/i14.jpg", url: "#", height: 400 },
  { id: "18", img: "/images/i15.jpg", url: "#", height: 660 },
  { id: "22", img: "/images/i19.jpg", url: "#", height: 760 },
  { id: "20", img: "/images/i17.jpg", url: "#", height: 400 },
  { id:"26",img:"/images/leader.jpg", url: "#", height:400 },
  //{ id: "6", img: "/images/i3.jpg", url: "#", height: 460 },
  //{ id: "3", img: "/images/group.jpg", url: "#", height: 600},
  //{ id: "4", img: "/images/i1.jpg", url: "#", height: 700 },
//{ id: "11", img: "/images/i8.jpg", url: "#", height: 300 },
//{ id: "13", img: "/images/i10.jpg", url: "#", height: 350 },
  // { id: "16", img: "/images/i13.jpg", url: "#", height: 400 },
  // { id: "19", img: "/images/i16.jpg", url: "#", height: 600 },
  //{ id: "21", img: "/images/i18.jpg", url: "#", height: 400 },
//{ id: "23", img: "/images/i20.jpg", url: "#", height: 300 },
//{ id: "24", img: "/images/i21.jpg", url: "#", height: 400 },
//{ id: "25", img: "/images/i22.jpg", url: "#", height: 350 },
//{id:"27",img:"/images/orglead.jpg", url: "#", height: 450},
];

function Pinterest() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-[90vh] relative">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </div>
  );
}

export default Pinterest;
