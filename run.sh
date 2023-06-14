#!/bin/bash
# VIDSOURCE="rtsp://:8554/"
# AUDIO_OPTS="-c:a aac -b:a 160000 -ac 2"
# VIDEO_OPTS="-s 854x480 -c:v libx264 -b:v 800000"
# OUTPUT_HLS="-hls_time 50 -hls_list_size 1 -start_number 1"
    # ffmpeg -i "rtsp://:8554/" -y -c:a aac -b:a 160000 -ac 2 -s 854x480 -c:v libx264 -b:v 800000 -hls_time 50 -hls_list_size 1 -start_number 1 ./static/mystream.m3u8


    # ffmpeg -i rtsp://:8554/ -c:a aac -b:a 128k -ac 2 -c:v libx264 -crf 2 -preset veryfast -b:v 1500k -flags -global_header -map 0 -f hls -hls_time 10 -hls_list_size 0 -hls_wrap 0 ./static/mystream.m3u8
ffmpeg -i rtsp://:8554/  -c:a aac -b:a 128k -ac 2 -c:v libx264 -crf 21 -preset veryfast -b:v 1500k -flags -global_header -map 0 -f hls -hls_time 100 -hls_list_size 10 -hls_flags delete_segments -hls_segment_filename ./static/segment_%03d.ts ./static/mystream.m3u8
