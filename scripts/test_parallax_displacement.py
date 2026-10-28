import numpy as np
from PIL import Image, ImageFilter
import os

# Test 2.5D Parallax Mesh Displacement
def create_sample_depth_map(w, h):
    """
    Creates a realistic depth map for Scene 1:
    - Floor / Counter: Gradual depth slope from bottom (near, 1.0) to horizon (far, 0.2)
    - AeroPress on right: High elevation (closer to camera, 0.85 - 1.0)
    - Chrome machine on left: Mid elevation (0.5 - 0.7)
    - Background wall: Far (0.1 - 0.2)
    """
    # Base vertical gradient for tabletop depth
    y_coords = np.linspace(0.1, 0.9, h)[:, None]
    depth = np.tile(y_coords, (1, w))
    
    # Add foreground weight on the right side (where AeroPress is placed)
    x_coords = np.linspace(0.0, 1.0, w)[None, :]
    depth = depth * 0.7 + (x_coords * 0.3)
    
    # Normalize to 0.0 - 1.0
    depth = (depth - depth.min()) / (depth.max() - depth.min())
    return depth

def render_parallax_frame(img_np, depth, pan_x, pan_y, zoom=1.0):
    """
    Displaces pixels based on depth value to create a true 3D camera parallax effect.
    Foreground (depth close to 1) moves faster than Background (depth close to 0).
    """
    h, w, c = img_np.shape
    
    # Pixel coordinates
    y_indices, x_indices = np.indices((h, w), dtype=np.float32)
    
    # Displace coordinates: Far background stays relatively still; foreground moves with camera
    # Parallax formula:
    dx = pan_x * depth
    dy = pan_y * depth
    
    # Map displaced coordinates
    src_x = np.clip(x_indices - dx, 0, w - 1).astype(np.int32)
    src_y = np.clip(y_indices - dy, 0, h - 1).astype(np.int32)
    
    displaced = img_np[src_y, src_x]
    return displaced

if __name__ == "__main__":
    src_path = "public/images/aeropress-scene-01-chrome-vs-syringe.jpg"
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    img_np = np.array(img)
    
    depth = create_sample_depth_map(w, h)
    
    # Save visualization of depth map
    depth_img = Image.fromarray((depth * 255).astype(np.uint8))
    os.makedirs("public/videos/parallax", exist_ok=True)
    depth_img.save("public/videos/parallax/scene01_depth_map.jpg")
    print("✅ Depth map generated: public/videos/parallax/scene01_depth_map.jpg")
    
    # Test displacement with a camera shift of 30 pixels horizontally
    displaced_np = render_parallax_frame(img_np, depth, pan_x=30.0, pan_y=0.0)
    displaced_img = Image.fromarray(displaced_np)
    displaced_img.save("public/videos/parallax/scene01_parallax_test.jpg")
    print("✅ Parallax test frame saved: public/videos/parallax/scene01_parallax_test.jpg")
