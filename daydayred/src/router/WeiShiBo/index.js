import Runlottery from '../../components/tth-Runlottery/Runlottery'
import Balllist from '../../components/tth-Runlottery/Balllist'
import BigLt from '../../components/tth-Runlottery/BigLt'
import Fc3D from '../../components/tth-Runlottery/Fc3D'
import Line3 from '../../components/tth-Runlottery/Line3'
import Choose11in5 from '../../components/tth-Runlottery/Choose11in5'
import RlFootball from '../../components/tth-Runlottery/rlfootball'
import RlBasketball from '../../components/tth-Runlottery/RlBasketball'
import BalllistNext from '../../components/tth-Runlottery/finalvue/Balllistnext'
import Fc3Dnext from '../../components/tth-Runlottery/finalvue/Fc3Dnext'
import BigLtnext from '../../components/tth-Runlottery/finalvue/BigLtnext'
import Line3next from '../../components/tth-Runlottery/finalvue/Line3next'
export default [
  {
    path: '/runlottery',
    name: 'runlottery',
    component: Runlottery
  },
  {
    path: '/balllist',
    name: 'balllist',
    component: Balllist
  },
  {
    path: '/biglt',
    name: 'biglt',
    component: BigLt
  },
  {
    path: '/fc3d',
    name: 'fc3d',
    component: Fc3D
  },
  {
    path: '/line3',
    name: 'line3',
    component: Line3
  },
  {
    path: '/choose11in5',
    name: 'choose11in5',
    component: Choose11in5
  },
  {
    path: '/rlfootball',
    name: 'rlfootball',
    component: RlFootball
  },
  {
    path: '/rlbasketball',
    name: 'rlbasketball',
    component: RlBasketball
  },
  {
    path: '/balllistnext',
    name: 'balllistnext',
    component: BalllistNext
  },
  {
    path: '/fc3Dnext',
    name: 'fc3Dnext',
    component: Fc3Dnext
  },
  {
    path: '/bigltnext',
    name: 'bigltnext',
    component: BigLtnext
  },
  {
    path: '/line3next',
    name: 'line3next',
    component: Line3next
  }

]
