import { useEffect, useRef } from "react";
import running from '../../assets/quby-run.gif';

const Timeout = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const raf = useRef<{
    id: any;
  }>({ id: null });

  const speedRef = useRef(4);

  /** requestAnimationFrame 실행 */
  const start = (callback: () => void) => {
    raf.current.id = setInterval(() => {
      callback();
    }, 1000 / 60);
  }

  /** requestAnimationFrame 일시 정지 */
  const pause = () => {
    clearInterval(raf.current.id);
  }

  /** requestAnimationFrame 중지 (초기화) */
  const stop = () => {
    clearInterval(raf.current.id);
  }

  let count = 10;

  /** image 애니메이션 동작 */
  const run = () => {
    count += speedRef.current;
    const windowWidth = window.innerWidth;
    if ((windowWidth - count) <= 0) {
      count = 10;
      imgRef.current?.style.setProperty('transform', `translateX(${-count}px)`);
    } else {
      imgRef.current?.style.setProperty('transform', `translateX(${-count}px)`);
    }
  }

  /** 애니메이션 시작 */
  const animationStart = () => {
    start(run);
  }

  useEffect(() => {
    animationStart();

    return () => {
      stop();
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div ref={imgRef} style={{ textAlign: 'right', position: 'relative', marginTop: 100, right: 10 }}>
        <img src={running} alt="" />
      </div>
      <div>
        <button onClick={() => speedRef.current++}>속도 증가</button>
        <button onClick={() => speedRef.current === 0 ? speedRef.current : speedRef.current--}>속도 감소</button>
      </div>
    </div >
  )
}

export default Timeout;