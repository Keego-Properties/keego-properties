import brandLogoImage from "@/assets/keego-logo.svg";
import brandLogoNavImage from "@/assets/keego-logo-nav.svg";

export const brandLogo =
  typeof brandLogoImage === "string" ? brandLogoImage : brandLogoImage.src;
export const brandLogoNav =
  typeof brandLogoNavImage === "string"
    ? brandLogoNavImage
    : brandLogoNavImage.src;
