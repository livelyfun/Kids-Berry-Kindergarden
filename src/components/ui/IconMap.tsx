import {
  Apple,
  Award,
  BedDouble,
  Blocks,
  BookOpen,
  CalendarCheck,
  Cctv,
  Clock,
  Compass,
  FileCheck,
  HandHeart,
  Heart,
  MessageCircle,
  Music,
  Palette,
  PartyPopper,
  ShieldCheck,
  Smile,
  Sparkles,
  Sprout,
  Sun,
  Trees,
  Users,
  Utensils,
} from "lucide-react";
import type { IconName } from "@/types/cms";

interface IconMapProps {
  name: IconName;
  className?: string;
}

export function IconMap({ name, className = "w-6 h-6" }: IconMapProps) {
  switch (name) {
    case "heart":
      return <Heart className={className} />;
    case "shield":
      return <ShieldCheck className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "users":
      return <Users className={className} />;
    case "sun":
      return <Sun className={className} />;
    case "book":
      return <BookOpen className={className} />;
    case "palette":
      return <Palette className={className} />;
    case "music":
      return <Music className={className} />;
    case "sprout":
      return <Sprout className={className} />;
    case "clock":
      return <Clock className={className} />;
    case "smile":
      return <Smile className={className} />;
    case "award":
      return <Award className={className} />;
    case "compass":
      return <Compass className={className} />;
    case "blocks":
      return <Blocks className={className} />;
    case "handHeart":
      return <HandHeart className={className} />;
    case "messageCircle":
      return <MessageCircle className={className} />;
    case "calendarCheck":
      return <CalendarCheck className={className} />;
    case "fileCheck":
      return <FileCheck className={className} />;
    case "partyPopper":
      return <PartyPopper className={className} />;
    case "utensils":
      return <Utensils className={className} />;
    case "trees":
      return <Trees className={className} />;
    case "camera":
      return <Cctv className={className} />;
    case "apple":
      return <Apple className={className} />;
    case "bed":
      return <BedDouble className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
