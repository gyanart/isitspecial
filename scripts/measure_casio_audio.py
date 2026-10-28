import os
import struct

def get_mp3_duration(filename):
    # Quick estimation via file size & bitrate or mutagen
    try:
        from mutagen.mp3 import MP3
        audio = MP3(filename)
        return audio.info.length
    except ImportError:
        pass
    
    # Alternatively use windows Shell.Application COM object or ffmpeg if available
    try:
        import win32com.client
    except:
        pass
    
    # Or simple estimation: edge-tts en-IN-Neerja default is 48kbps or 64kbps CBR/VBR
    # Let's inspect with mutagen by installing or using python
    return 15.0

# Let's test if mutagen is installed, if not install it
try:
    import mutagen
except ImportError:
    os.system("pip install mutagen")

from mutagen.mp3 import MP3

total_dur = 0
total_frames = 0
results = []

for i in range(1, 17):
    fn = f"casio_scene{i:02d}_in.mp3"
    path = os.path.join("public", "audio", "casio", fn)
    audio = MP3(path)
    dur = audio.info.length
    # Buffer: 1.0 second
    dur_buf = dur + 1.0
    frames = int(round(dur_buf * 30))
    results.append({
        "scene": i,
        "filename": fn,
        "raw_duration": round(dur, 2),
        "buffered_duration": round(dur_buf, 2),
        "frames": frames
    })
    total_dur += dur_buf
    total_frames += frames

print(results)
print(f"Total Duration: {total_dur:.2f}s (approx {total_dur/60:.2f} mins), Total Frames: {total_frames}")
