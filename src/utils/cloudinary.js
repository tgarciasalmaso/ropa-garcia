const cloudName = "dniwz8amt";

export function buildCloudinaryUrl(slug, index = 1, width = 600) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_auto,f_auto/${slug}/${index}`;
}

//https://res.cloudinary.com/dniwz8amt/image/upload/w_600,q_auto,f_auto/bermuda-baggy-undefined/1