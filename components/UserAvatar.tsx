import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "./ui/avatar"

const UserAvatar = ({ user }: { user: string }) => {
  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback
        className={cn(user === "ME" && "bg-primary/75 text-white")}>
        {user}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
