import brandLogoImage from "@/assets/keego-logo.png";
import brandLogoNavImage from "@/assets/keego-logo-nav.png";

export const brandLogo =
  typeof brandLogoImage === "string" ? brandLogoImage : brandLogoImage.src;
export const brandLogoNav =
  typeof brandLogoNavImage === "string"
    ? brandLogoNavImage
    : brandLogoNavImage.src;
