
import { sb } from "./script.js";
const marqueeSpan = document.querySelector(".running-text span");
const notifEl = document.getElementById("notifBaru");
const notifBidangEl = document.getElementById("bidangNotif");
let semuaData = []; let bidangAktifIndex = 0;
const bidangList = ["RT","PKK","Karang"]; const ROTASI_MS = 15000;
const CACHE_KEY = "rt-smartinfo-lasttext"; const CACHE_DATA = "rt-smartinfo-data";
function formatTanggalID(iso){ try{ return new Date(iso).toLocaleDateString("id-ID",{day:"2-digit",month:"short"}) }catch{ return iso } }
function renderBidang(){ const bidang = bidangList[bidangAktifIndex];
  const darurat = semuaData.filter(d=>d.prioritas==='darurat' && d.status==='aktif');
  const dataBidang = semuaData.filter(d=>d.bidang===bidang && d.status==='aktif');
  const icon = b=> b==='PKK'?'🌸':(b==='Karang'?'💪':'📢');
  const teksDarurat = darurat.map(d=>`🚨 [DARURAT] ${d.judul}`).join(' | ');
  const teksBidang = dataBidang.map(d=>`${icon(d.bidang)} [${d.bidang}] ${formatTanggalID(d.tanggal)} — ${d.judul}`).join(' | ');
  const finalText = (teksDarurat?teksDarurat+' | ':'') + (teksBidang || `📢 Belum ada pengumuman ${bidang}`);
  marqueeSpan.textContent = finalText; localStorage.setItem(CACHE_KEY, finalText);
  bidangAktifIndex = (bidangAktifIndex + 1) % bidangList.length; }
async function ambilData(){ const { data } = await sb.from('pengumuman').select('judul,tanggal,bidang,status,prioritas').order('tanggal',{ascending:true}).limit(30);
  semuaData = data||[]; localStorage.setItem(CACHE_DATA, JSON.stringify(semuaData)); renderBidang(); }
function setupRealtime(){ sb.channel('pengumuman-watch').on('postgres_changes',{event:'INSERT',schema:'public',table:'pengumuman'}, payload=>{
  notifBidangEl.textContent = payload.new.bidang || 'RT'; notifEl.style.display='block'; notifEl.style.animation='fadeInOut 5s ease';
  setTimeout(()=>{notifEl.style.display='none'; notifEl.style.animation=''},5200); ambilData(); }).subscribe(); }
(function init(){ const cached = localStorage.getItem(CACHE_KEY); if (cached) marqueeSpan.textContent = cached;
  const cachedData = localStorage.getItem(CACHE_DATA); if (cachedData){ try{ semuaData = JSON.parse(cachedData) }catch{} }
  ambilData().finally(()=>{ setInterval(renderBidang, ROTASI_MS); setupRealtime(); }); })();
