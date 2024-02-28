import AnimationComponent from '../../components/animation/Animation';
import Timeout from '../../components/animation/Timeout';

export const Animation = () => {

  return (
    <div style={{ width: '100%' }}>
      <AnimationComponent />
      <Timeout />
    </div >
  )
}

export default Animation;