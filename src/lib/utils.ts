// English numbers to Bangla numbers conversion
export function toBanglaNumber(num: number | string): string {
  const banglaDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return num.toString().replace(/\d/g, (digit) => banglaDigits[digit]);
}

// Current Bangla Date Helper
export function getFormattedBanglaDate(): string {
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const today = new Date();
  const dayName = days[today.getDay()];
  const dateNum = toBanglaNumber(today.getDate());
  const monthName = months[today.getMonth()];
  const yearNum = toBanglaNumber(today.getFullYear());

  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}