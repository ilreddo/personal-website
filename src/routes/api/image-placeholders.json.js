import {
  dominantColourPlaceholder,
  IMAGE_DIR,
  lowResolutionPlaceholder,
} from '$lib/utilities/image';
import path from 'path';
const __dirname = path.resolve();

export const post = async ({ request }) => {
  console.log('POST API CALLED');
  try {
    const { images } = await request.json();

    const dominantColourPromises = images.map((element) => {
      const source = path.join(__dirname, IMAGE_DIR, element);
      return dominantColourPlaceholder({ source });
    });

    const placeholderPromises = await images.map((element) => {
      const source = path.join(__dirname, IMAGE_DIR, element);
      return lowResolutionPlaceholder({ source });
    });

    const dominantColours = await Promise.all(dominantColourPromises);
    const placeholders = await Promise.all(placeholderPromises);
    return {
      body: JSON.stringify({ placeholders, dominantColours }),
    };
  } catch (err) {
    return {
      status: 500,
      error: 'Error retrieving data',
    };
  }
};
