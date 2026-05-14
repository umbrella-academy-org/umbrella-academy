"use client";

const brands = [
    "Netflix", "Disney+", "BBC", "Amazon Prime", "Sky", "ITV", "National Lottery",
    "UK Cinema Association", "BFI", "Warner Bros", "Apple TV+", "Channel 4"
];

export function BrandsMarquee() {
    return (
        <div className="py-12 md:py-20 bg-white border-b border-gray-100 overflow-hidden">
            <div className="max-w-full mx-auto px-6 mb-8 md:mb-12">
                <h2 className="text-[10px] md:text-sm font-bold tracking-[0.4em] text-gray-400  text-center mb-2">Our credits tell the story</h2>
                <div className="w-12 md:w-20 h-0.5 md:h-1 bg-[#ca8a04] mx-auto" />
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {brandList(brands)}
                    {brandList(brands)}
                </div>
            </div>
        </div>
    );
}

function brandList(list: string[]) {
    return (
        <div className="flex items-center">
            {list.map((brand, i) => (
                <span
                    key={i}
                    className="mx-6 md:mx-12 text-2xl md:text-6xl font-black text-gray-200 hover:text-gray-900 transition-colors cursor-default select-none  tracking-tighter"
                >
                    {brand}
                </span>
            ))}
        </div>
    );
}
