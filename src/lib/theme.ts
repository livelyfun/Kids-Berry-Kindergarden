import type { BrandAccent } from "@/types/cms";

export interface AccentStyle {
  badge: string;
  iconBg: string;
  iconText: string;
  border: string;
  softBg: string;
  solidBg: string;
  hoverRing: string;
  dot: string;
}

export const ACCENT_STYLES: Record<BrandAccent, AccentStyle> = {
  magenta: {
    badge: "bg-[#FFF1EB] text-[#E91E63] border-[#E91E63]/20",
    iconBg: "bg-[#E91E63]/10",
    iconText: "text-[#E91E63]",
    border: "border-[#E91E63]/20",
    softBg: "bg-[#FFF1EB]",
    solidBg: "bg-[#E91E63] text-white",
    hoverRing: "hover:border-[#E91E63]/45",
    dot: "bg-[#E91E63]",
  },
  orange: {
    badge: "bg-[#FFF1EB] text-[#FF7A45] border-[#FF7A45]/25",
    iconBg: "bg-[#FF7A45]/12",
    iconText: "text-[#FF7A45]",
    border: "border-[#FF7A45]/25",
    softBg: "bg-[#FFF1EB]",
    solidBg: "bg-[#FF7A45] text-white",
    hoverRing: "hover:border-[#FF7A45]/50",
    dot: "bg-[#FF7A45]",
  },
  teal: {
    badge: "bg-[#26A69A]/10 text-[#26A69A] border-[#26A69A]/25",
    iconBg: "bg-[#26A69A]/12",
    iconText: "text-[#26A69A]",
    border: "border-[#26A69A]/25",
    softBg: "bg-[#26A69A]/8",
    solidBg: "bg-[#26A69A] text-white",
    hoverRing: "hover:border-[#26A69A]/50",
    dot: "bg-[#26A69A]",
  },
  coral: {
    badge: "bg-[#FF6B81]/10 text-[#FF6B81] border-[#FF6B81]/25",
    iconBg: "bg-[#FF6B81]/12",
    iconText: "text-[#FF6B81]",
    border: "border-[#FF6B81]/25",
    softBg: "bg-[#FFF1EB]",
    solidBg: "bg-[#FF6B81] text-white",
    hoverRing: "hover:border-[#FF6B81]/50",
    dot: "bg-[#FF6B81]",
  },
  olive: {
    badge: "bg-[#AED581]/20 text-[#2D3436] border-[#AED581]/45",
    iconBg: "bg-[#AED581]/35",
    iconText: "text-[#2D3436]",
    border: "border-[#AED581]/40",
    softBg: "bg-[#AED581]/12",
    solidBg: "bg-[#AED581] text-[#2D3436]",
    hoverRing: "hover:border-[#AED581]/65",
    dot: "bg-[#AED581]",
  },
  blue: {
    badge: "bg-[#5C6BC0]/10 text-[#5C6BC0] border-[#5C6BC0]/25",
    iconBg: "bg-[#5C6BC0]/12",
    iconText: "text-[#5C6BC0]",
    border: "border-[#5C6BC0]/25",
    softBg: "bg-[#5C6BC0]/8",
    solidBg: "bg-[#5C6BC0] text-white",
    hoverRing: "hover:border-[#5C6BC0]/50",
    dot: "bg-[#5C6BC0]",
  },
};
