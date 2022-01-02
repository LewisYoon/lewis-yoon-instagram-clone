import { useSession } from "next-auth/react";
function Story({ img, username, myStory }) {
  const { data: session } = useSession();
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-2
         border-red-500 object-contain cursor-pointer
         hover:scale-110 transition-transform duration-200 ease-out"
        src={`https://i.pravatar.cc/150?img=${img}`}
        alt=""
      />

      {/* above image source is a temporary solutions, as fakercloud is not working atm. orginally, src whould be {img} */}
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
