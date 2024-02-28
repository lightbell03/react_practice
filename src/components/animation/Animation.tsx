import { useCallback, useEffect, useRef } from "react";
import running from '../../assets/quby-run.gif';

const ANIMATION_STATUS = {
  RUNNING: 'running',
  PAUSE: 'pause',
  STOP: 'stop'
} as const;

const AnimationComponent = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const raf = useRef<{
    id: any;
    baseSpeed: number;
    status: typeof ANIMATION_STATUS[keyof typeof ANIMATION_STATUS];
  }>({ id: null, baseSpeed: 4, status: ANIMATION_STATUS.STOP });

  const speedRef = useRef(4);

  const tick = (callback: () => void) => {
    raf.current.status = ANIMATION_STATUS.RUNNING;
    raf.current.id = requestAnimationFrame(() => {
      callback();

      tick(callback);
    });
  }

  /** requestAnimationFrame 실행 */
  const start = (callback: () => void) => {
    if (raf.current.status === ANIMATION_STATUS.RUNNING) return;

    tick(callback);
  }

  /** requestAnimationFrame 일시 정지 */
  const pause = () => {
    raf.current.status = ANIMATION_STATUS.PAUSE;
    cancelAnimationFrame(raf.current.id);
  }

  /** requestAnimationFrame 중지 (초기화) */
  const stop = () => {
    raf.current.baseSpeed = 4;
    raf.current.status = ANIMATION_STATUS.STOP;

    cancelAnimationFrame(raf.current.id);
  }

  /** image 애니메이션 동작 */
  const run = () => {
    raf.current.baseSpeed += speedRef.current;
    const windowWidth = window.innerWidth;
    if ((windowWidth - raf.current.baseSpeed) <= 0) {
      raf.current.baseSpeed = 10;
      imgRef.current?.style.setProperty('transform', `translateX(${-raf.current.baseSpeed}px)`);
    } else {
      imgRef.current?.style.setProperty('transform', `translateX(${-raf.current.baseSpeed}px)`);
    }
  }

  /** 애니메이션 달리기 멈춤 */
  const stand = useCallback(() => {
    pause();
  }, []);

  /** 애니메이션 시작 */
  const animationStart = () => {
    start(run);
  }

  useEffect(() => {
    animationStart();
    if (imgRef.current) {
      imgRef.current.addEventListener("mouseover", stand);
      imgRef.current.addEventListener('mouseleave', animationStart);
    }

    return () => {
      stop();
      if (imgRef.current) {
        imgRef.current.removeEventListener('mouseover', stand);
        imgRef.current.removeEventListener('mouseleave', animationStart);
      }
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'right', position: 'relative', marginTop: 100 }}>
        <img ref={imgRef} style={{ right: 10 }} src={running} alt="" />
      </div>
      <div>
        <button style={{ width: 100, height: 100, fontSize: 18, fontWeight: 'bold' }} onClick={() => speedRef.current++}>속도 증가</button>
        <button style={{ width: 100, height: 100, fontSize: 18, fontWeight: 'bold' }} onClick={() => speedRef.current === 0 ? speedRef.current : speedRef.current--}>속도 감소</button>
        <button style={{ width: 100, height: 100, fontSize: 18, fontWeight: 'bold' }} onClick={() => animationStart()}>시작</button>
        <button style={{ width: 100, height: 100, fontSize: 18, fontWeight: 'bold' }} onClick={() => stop()}>중지</button>
        <button style={{ width: 100, height: 100, fontSize: 18, fontWeight: 'bold' }} onClick={() => pause()}>멈춰!!!</button>
      </div>

      <button onClick={() => {
        if (imgRef.current) {
          imgRef.current.removeEventListener('mouseover', stand);
        }
      }}>test</button>
    </div >
  )
}

export default AnimationComponent;