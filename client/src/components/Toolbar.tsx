import React, { ReactElement } from "react";

import artboardSlice from "../store/artboardSlice";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "../components/Component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPaintBrush, faPalette, faSquare } from "@fortawesome/free-solid-svg-icons";
import gameSlice from "../store/gameSlice";

import "./styles/gameStyles.css";

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

export default function Toolbar({ className = null }: Props) {
  const artboard = {
    state: useSelector((state: RootState) => state.artboard),
    actions: artboardSlice.actions,
  };

  const game = {
    state: useSelector((state: RootState) => state.game),
    actions: gameSlice.actions,
  };

  const dispatch = useDispatch();

  styles.static = "grid grid-cols-2 grid-rows-2 md:grid-cols-[max-content_1fr_max-content] md:grid-rows-1 gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 bg-neutral-300";
  styles.dynamic = className;

  return (
    <Component id="Toolbar">
      <div className={game.state.isTurn ? `${styles.static} ${styles.dynamic}` : `avoid-clicks ${styles.static} ${styles.dynamic}`}>
        <div className="flex justify-start items-center gap-2 md:gap-3 lg:gap-4 w-full col-start-1 col-span-1 row-start-1 row-span-1 md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-1">
          <FontAwesomeIcon
            icon={faEraser}
            className={`text-xs ${artboard.state.eraserWidth === 8 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => {
              dispatch(artboard.actions.setEraserWidth(8));
              dispatch(artboard.actions.setCurrentColor("#ffffff"));
            }}
          />
          <FontAwesomeIcon
            icon={faEraser}
            className={`text-sm ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.eraserWidth === 13 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => {
              dispatch(artboard.actions.setEraserWidth(13));
              dispatch(artboard.actions.setCurrentColor("#ffffff"));
            }}
          />
          <FontAwesomeIcon
            icon={faEraser}
            className={`text-md ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.eraserWidth === 21 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => {
              dispatch(artboard.actions.setEraserWidth(21));
              dispatch(artboard.actions.setCurrentColor("#ffffff"));
            }}
          />
          <FontAwesomeIcon
            icon={faEraser}
            className={`text-lg ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.eraserWidth === 34 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => {
              dispatch(artboard.actions.setEraserWidth(34));
              dispatch(artboard.actions.setCurrentColor("#ffffff"));
            }}
          />
          <FontAwesomeIcon
            icon={faEraser}
            className={`text-xl ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.eraserWidth === 55 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => {
              dispatch(artboard.actions.setEraserWidth(55));
              dispatch(artboard.actions.setCurrentColor("#ffffff"));
            }}
          />
        </div>
        <div className="flex justify-between md:justify-center items-center gap-2 md:gap-3 lg:gap-4 col-start-1 col-span-2 row-start-2 row-span-1 md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-1">
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#171717" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-neutral-900`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#171717"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#f43f5e" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-rose-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#f43f5e"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#f59e0b" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-amber-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#f59e0b"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#eab308" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-yellow-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#eab308"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#10b981" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-emerald-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#10b981"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#0ea5e9" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-sky-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#0ea5e9"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#8b5cf6" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-violet-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#8b5cf6"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#d946ef" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-fuchsia-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#d946ef"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#ec4899" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-pink-500`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#ec4899"));
            }}
          />
          <FontAwesomeIcon
            icon={faSquare}
            className={`border-b-4 ${!game.state.isTurn ? "pointer-events-none" : ""} ${
              artboard.state.currentColor === "#ffffff" ? "border-neutral-900 opacity-100" : "border-transparent opacity-25"
            } text-white`}
            onClick={e => {
              dispatch(artboard.actions.setCurrentColor("#ffffff"));
            }}
          />
        </div>
        <div className="flex justify-end items-center gap-2 md:gap-3 lg:gap-4 w-full col-start-2 col-span-1 row-start-1 row-span-1 md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1">
          <FontAwesomeIcon
            icon={faPaintBrush}
            className={`text-xs ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.lineWidth === 3 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => dispatch(artboard.actions.setLineWidth(3))}
          />
          <FontAwesomeIcon
            icon={faPaintBrush}
            className={`text-sm ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.lineWidth === 5 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => dispatch(artboard.actions.setLineWidth(5))}
          />
          <FontAwesomeIcon
            icon={faPaintBrush}
            className={`text-md ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.lineWidth === 8 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => dispatch(artboard.actions.setLineWidth(8))}
          />
          <FontAwesomeIcon
            icon={faPaintBrush}
            className={`text-lg ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.lineWidth === 13 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => dispatch(artboard.actions.setLineWidth(13))}
          />
          <FontAwesomeIcon
            icon={faPaintBrush}
            className={`text-xl ${!game.state.isTurn ? "pointer-events-none" : ""} ${artboard.state.lineWidth === 21 ? "text-neutral-900" : "text-neutral-400"}`}
            onClick={() => dispatch(artboard.actions.setLineWidth(21))}
          />
        </div>
      </div>
    </Component>
  );
}
