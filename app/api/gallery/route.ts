import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const folder = process.env.CLOUDINARY_GALLERY_FOLDER;

    if (!folder) {
      return NextResponse.json(
        { error: "Gallery folder is not configured" },
        { status: 500 },
      );
    }

    let nextCursor: string | undefined;
    const photos = [];

    do {
      const result = await cloudinary.api.resources_by_asset_folder(folder, {
        max_results: 500,
        direction: "asc",
        ...(nextCursor ? { next_cursor: nextCursor } : {}),
      });
      const images = result.resources
        .filter((item: any) => item.resource_type === "image")
        .map((item: any) => ({
          id: item.asset_id,
          publicId: item.public_id,
          url: item.secure_url,
          width: item.width,
          height: item.height,
          format: item.format,
        }))
        .sort((a, b) =>
          a.publicId.localeCompare(b.publicId, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );

      photos.push(...images);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    return NextResponse.json(
      { photos },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Cloudinary gallery error:", error);

    return NextResponse.json(
      { error: "Failed to retrieve gallery photos" },
      { status: 500 },
    );
  }
}
