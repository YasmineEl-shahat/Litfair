import React from "react";
import PropTypes from "prop-types";

// import Timer from "./timer";
// import Countdown from "./countdown";

const Actions = ({
  t,
  isVideoInputSupported,
  isInlineRecordingSupported,
  thereWasAnError,
  isRecording,
  isCameraOn,
  streamIsReady,
  isConnecting,
  isRunningCountdown,
  isReplayingVideo,
  countdownTime,
  timeLimit,
  showReplayControls,
  replayVideoAutoplayAndLoopOff,
  useVideoInput,

  onTurnOnCamera,
  onTurnOffCamera,
  onOpenVideoInput,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onStopReplaying,
  onConfirm,
}) => {
  const renderContent = () => {
    const shouldUseVideoInput =
      !isInlineRecordingSupported && isVideoInputSupported;

    if (
      (!isInlineRecordingSupported && !isVideoInputSupported) ||
      thereWasAnError ||
      isConnecting ||
      isRunningCountdown
    ) {
      return null;
    }

    if (isReplayingVideo) {
      return (
        <button
          className="btn--global "
          type="button"
          onClick={onStopReplaying}
          data-qa="start-replaying"
        >
          {t("Use another video")}
        </button>
      );
    }

    if (isRecording) {
      return (
        <button
          className="btn--global cancel--onb"
          type="button"
          onClick={onStopRecording}
          data-qa="stop-recording"
        />
      );
    }

    if (isCameraOn && streamIsReady) {
      return (
        <button
          className="btn--global"
          t={t}
          type="button"
          onClick={onStartRecording}
          data-qa="start-recording"
        />
      );
    }

    if (useVideoInput) {
      return (
        <button
          className="btn--global"
          type="button"
          onClick={onOpenVideoInput}
          data-qa="open-input"
        >
          {t("Upload a video")}
        </button>
      );
    }

    return shouldUseVideoInput ? (
      <button
        className="btn--global"
        type="button"
        onClick={onOpenVideoInput}
        data-qa="open-input"
      >
        {t("Record a video")}
      </button>
    ) : (
      <button
        className="btn--global"
        type="button"
        onClick={onTurnOnCamera}
        data-qa="turn-on-camera"
      >
        {t("Turn my camera ON")}
      </button>
    );
  };

  return (
    <div>
      {isRecording && <Timer timeLimit={timeLimit} />}
      {isRunningCountdown && <Countdown countdownTime={countdownTime} />}
      <>{renderContent()}</>
    </div>
  );
};

Actions.propTypes = {
  t: PropTypes.func,
  isVideoInputSupported: PropTypes.bool,
  isInlineRecordingSupported: PropTypes.bool,
  thereWasAnError: PropTypes.bool,
  isRecording: PropTypes.bool,
  isCameraOn: PropTypes.bool,
  streamIsReady: PropTypes.bool,
  isConnecting: PropTypes.bool,
  isRunningCountdown: PropTypes.bool,
  countdownTime: PropTypes.number,
  timeLimit: PropTypes.number,
  showReplayControls: PropTypes.bool,
  replayVideoAutoplayAndLoopOff: PropTypes.bool,
  isReplayingVideo: PropTypes.bool,
  useVideoInput: PropTypes.bool,

  onTurnOnCamera: PropTypes.func,
  onTurnOffCamera: PropTypes.func,
  onOpenVideoInput: PropTypes.func,
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
  onPauseRecording: PropTypes.func,
  onResumeRecording: PropTypes.func,
  onStopReplaying: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default Actions;
