'use client';

import { useState, useEffect, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');

export const useVapi = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        vapi.on('call-start', () => {
            setConnected(true);
            setIsConnecting(false);
        });

        vapi.on('call-end', () => {
            setConnected(false);
            setIsConnecting(false);
            setTranscript('');
        });

        vapi.on('speech-start', () => {
            setAssistantIsSpeaking(true);
        });

        vapi.on('speech-end', () => {
            setAssistantIsSpeaking(false);
        });

        vapi.on('volume-level', (level) => {
            setVolumeLevel(level);
        });

        vapi.on('message', (message) => {
            if (message.type === 'transcript' && message.transcriptType === 'partial') {
                setTranscript(message.transcript);
            }
        });

        vapi.on('error', (error) => {
            console.error('Vapi error:', error);
            setIsConnecting(false);
        });

        return () => {
            vapi.removeAllListeners();
        };
    }, []);

    const start = useCallback(async (assistantIdOrConfig?: any) => {
        setIsConnecting(true);
        try {
            // If no config is provided, it will use the default assistant from Vapi dashboard
            await vapi.start(assistantIdOrConfig);
        } catch (error) {
            console.error('Failed to start Vapi call:', error);
            setIsConnecting(false);
        }
    }, []);

    const stop = useCallback(() => {
        vapi.stop();
    }, []);

    const toggle = useCallback(() => {
        if (connected) {
            stop();
        } else {
            start();
        }
    }, [connected, start, stop]);

    return {
        connected,
        isConnecting,
        assistantIsSpeaking,
        volumeLevel,
        transcript,
        start,
        stop,
        toggle
    };
};
