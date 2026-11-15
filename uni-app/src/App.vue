<script>
import { initializeBuyAirtimeSkill } from './services/buyAirtime.js'

export default {
  onLaunch: function () {
    console.log('[telebirr] UniApp launched')
    initializeBuyAirtimeSkill()
  },
}
</script>

<style>
@import './styles.css';
</style>
