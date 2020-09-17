/* eslint-disable */
import React, { useState, useEffect } from 'react';

export const createAudioCtx = () => {
	const AudioCtxClass = (
		window.AudioContext ||
		window.webkitAudioContext ||
		window.mozAudioContext
	);
	const audioCtx = new AudioCtxClass();
	return audioCtx;
}

export const createAudioBufferFromFile = (
	file: File,
	audioCtx: AudioContext,
	onLoad: (buf: AudioBuffer) => void,
): void => {
	const reader = new FileReader();
	reader.readAsArrayBuffer(file);
	reader.onload = (e) => {
		const res = e.target?.result as ArrayBuffer;
		audioCtx.decodeAudioData(res, onLoad);
	}
}

export const audioBufferSlice = (
	audioCtx: AudioContext,
	buffer: AudioBuffer,
	begin: number,
	end: number,
): AudioBuffer => {
	const audioContext = audioCtx

	let error = null;

	const duration = buffer.duration;
	const channels = buffer.numberOfChannels;
	const rate = buffer.sampleRate;

	if (begin < 0) {
		error = new RangeError('begin time must be greater than 0');
	}

	if (end > duration) {
		error = new RangeError('end time must be less than or equal to ' + duration);
	}

	const startOffset = rate * begin;
	const endOffset = rate * end;
	const frameCount = endOffset - startOffset;
	let newArrayBuffer;

	try {
		newArrayBuffer = audioContext.createBuffer(channels, endOffset - startOffset, rate);
		const anotherArray = new Float32Array(frameCount);
		const offset = 0;

		for (let channel = 0; channel < channels; channel++) {
			buffer.copyFromChannel(anotherArray, channel, startOffset);
			newArrayBuffer.copyToChannel(anotherArray, channel, offset);
		}
	} catch (e) {
		error = e;
		console.error(e);
	}

	return newArrayBuffer as AudioBuffer;
}

export const concatAudioBuffers = (audioCtx: AudioContext, buffers: AudioBuffer[]): AudioBuffer => {
	let output = audioCtx.createBuffer(
		1,
		buffers.map(buffer => buffer.length).reduce((a, b) => a + b, 0),
		buffers[0].sampleRate,
	)

	let offset = 0;

	buffers.map(buffer => {
		output.getChannelData(0).set(buffer.getChannelData(0), offset);
		offset += buffer.length;
	});
	return output;
}

export const layerAudioBuffers = (audioCtx: AudioContext, buffers: AudioBuffer[]): AudioBuffer => {
	let output = audioCtx.createBuffer(
		1,
		buffers.map(buffer => buffer.length).reduce((a, b) => a + b, 0),
		buffers[0].sampleRate,
	);

	buffers.map(buffer => {
		for (let i = buffer.getChannelData(0).length - 1; i >= 0; i--) {
			output.getChannelData(0)[i] += buffer.getChannelData(0)[i];
		}
	});
	return output;
}
