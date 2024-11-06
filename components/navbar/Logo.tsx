import Link from "next/link";
import { Button } from "../ui/button";
import { LuTent } from "react-icons/lu";

const Logo = () => {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <LuTent className="w-12 h-12" />
      </Link>
    </Button>
  );
};

export default Logo;
