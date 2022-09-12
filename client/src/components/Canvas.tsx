import React, { MouseEvent, useEffect, useRef, useState } from "react";

import artboardSlice from "../store/artboardSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "w-full h-full cursor-crosshair";

const Canvas = ({ className }: Props) => {
  const artboard = {
    state: useSelector((state: RootState) => state.artboard),
    actions: artboardSlice.actions,
  };

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = canvas.current?.getContext("2d");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!canvas.current) return;
    canvas.current.width = canvas.current.offsetWidth;
    canvas.current.height = canvas.current.offsetHeight;
  }, []);

  const beginPath = () => {
    if (!ctx) return;
    ctx.beginPath();
  };

  const moveTo = (nativeEvent: MouseEvent | any) => {
    if (!ctx) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.moveTo(offsetX, offsetY);
  };

  const lineTo = (nativeEvent: MouseEvent | any) => {
    if (!ctx) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.lineTo(offsetX, offsetY);
  };

  const styleStroke = () => {
    if (!ctx) return;
    ctx.strokeStyle = artboard.state.currentColor;
    ctx.lineWidth = artboard.state.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingQuality = "high";
  };

  const stroke = () => {
    if (!ctx) return;
    ctx.stroke();
  };

  const start = ({ nativeEvent }: MouseEvent | any) => {
    dispatch(artboard.actions.setIsDrawing(true));
    styleStroke();
    moveTo(nativeEvent);
    beginPath();
    lineTo(nativeEvent);
    stroke();
    moveTo(nativeEvent);
    beginPath();
  };

  const stop = () => {
    if (!ctx) return;
    ctx.closePath();
    dispatch(artboard.actions.setIsDrawing(false));
  };

  const draw = ({ nativeEvent }: MouseEvent | any) => {
    if (!artboard.state.isDrawing) return;
    styleStroke();
    lineTo(nativeEvent);
    stroke();
    beginPath();
    moveTo(nativeEvent);
  };

  return (
    <canvas
      ref={canvas}
      className={`${styles.static} ${styles.dynamic}`}
      onMouseDown={e => {
        start(e);
      }}
      onMouseUp={e => {
        stop();
      }}
      onMouseMove={e => {
        draw(e);
      }}
      onMouseEnter={e => {
        if (!artboard.state.isDrawing) return;
        styleStroke();
        moveTo(e);
        beginPath();
        lineTo(e);
        stroke();
      }}
      onMouseLeave={e => {
        moveTo(e);
      }}
      onTouchStart={e => {
        start(e);
      }}
      onTouchEnd={e => {
        stop();
      }}
      onTouchMove={e => {
        draw(e);
      }}
    ></canvas>
  );
};

export default Canvas;
