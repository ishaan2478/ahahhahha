const stanzas = [
  "App itne ache ho mee bta nai sakta baby mera pyaara bacha 🥰." ,

  "Apse acha koi nai hai jaan meri baby app mere liye sabse cute ho, sabse haseen ho, sapse preetiest ho mere liye. 💝",  

  "Kabhi socha nahi tha ki kisi se itna pyaar ho jaayega, lekin app mil gayi... aur sab kuch badal gaya. app ho toh sab kuch perfect lagta hai.",
  
  " app meri khushi ho, meri baby ho, mera sabse barda sookoon ho 💞.",
  
  "Apke bina kuch adhoora lagta hai... aur apke saath sab poora lagta hai 💫.",
  
  "Hamesha mere saath rehna, kyunki app bin main kuch bhi nahi. App meri duniya ho, meri jaan ho, meri Love ho jii \"forever waali\" 💍.",
  
  "I love you...I Love You sooooooo much mera pyaara bacha,💖 *Jo apse dil se pyaar karta hai... Ishaan Mishra* 💖",

  "Umaaaaaahhhhhhhhhhh......💋💋💋💋💋💋🤗🤭💝🥰💗😚😚" ,

];

let current = 0;
const container = document.getElementById('typewriter');

function typeStanza(text, callback) {
  container.innerHTML = "";
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      container.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      setTimeout(callback, 2000);
    }
  }, 40);
}

function showNext() {
  if (current < stanzas.length) {
    typeStanza(stanzas[current], () => {
      current++;
      setTimeout(() => {
        if (current < stanzas.length) {
          container.innerHTML = ""; // Only clear if more stanzas are coming
        }
        showNext();
      }, 2000); // pause between stanzas
    });
  } else {
    // ✅ Final stanza stays, now fade in button
    setTimeout(() => {
      document.getElementById("next-button").classList.add("show");
    }, 1000); // delay before fade-in
  }
}
showNext();
