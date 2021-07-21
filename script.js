fetch('data.json').then((res) => {
  res.json().then((res) => {
    const candidati = res.listaCandidati;
    const specializari = res.listaSpecializari;
    document.querySelector('.spinner').style.display = 'none';
    repartizare(candidati, specializari);
  });
});

document.querySelector('.cautaNrLegitim').oninput = (e) => {
  document.querySelectorAll('.nrLeg').forEach((i) => {
    if (parseInt(i.textContent) === parseInt(e.target.value)) {
      window.scroll({
        top: i.offsetTop - window.innerHeight / 2,
        behavior: 'smooth',
      });
      i.parentElement.style.border = `1px #fff solid`;
      function checkIfChanged() {
        if (parseInt(i.textContent) !== parseInt(e.target.value)) {
          i.parentElement.style.border = `1px #222 solid`;
        } else {
          setTimeout(checkIfChanged, 300);
        }
      }
      checkIfChanged();
    }
  });
};

const repartizare = (candidati, specializari) => {
  const denumiriSpecializari = Object.keys(specializari);

  candidati.forEach((e) => {
    e[2] = true;
  });

  for (let j = 0; j < candidati.length; j++) {
    for (let x = 0; x < denumiriSpecializari.length; x++) {
      for (let i = 4; i < candidati[j].length; i++) {
        if (
          specializari[denumiriSpecializari[x]].cod === candidati[j][i] &&
          specializari[denumiriSpecializari[x]].locuri >
            specializari[denumiriSpecializari[x]].admisi.length &&
          candidati[j][2]
        ) {
          specializari[denumiriSpecializari[x]].admisi.push(candidati[j]);
          candidati[j][2] = false;
          break;
        }
      }
    }
  }

  for (let i = 0; i < denumiriSpecializari.length; i++) {
    let elem = document.createElement('div');
    let admisi = specializari[denumiriSpecializari[i]].admisi;
    let note = [];
    for (let i = 0; i < admisi.length; i++) {
      note.push(admisi[i][1]);
    }
    let legitim = [];
    for (let i = 0; i < admisi.length; i++) {
      legitim.push(admisi[i][0]);
    }

    let noteString = '';
    for (let i = 0; i < note.length; i++) {
      noteString += `<div class="cell"><span class="nrCrt">${
        i + 1 < 10 ? `0${i + 1}` : i + 1
      }.</span><span class="nota" >${
        note[i] === 10 ? note[i].toFixed(1) : note[i].toFixed(2)
      }</span><span class="nrLeg">${legitim[i]}</span></div>`;
    }
    elem.innerHTML = `<h1>${denumiriSpecializari[i].replace(
      /_/g,
      ' '
    )}</h1>${noteString}`;
    document.querySelector('.rez').appendChild(elem);
  }
};

const ordoneazaCandidatii = (listaCandidati) => {
  listaCandidati.sort((a, b) => {
    return (
      parseFloat(b[1].replace(/,/g, '.')) - parseFloat(a[1].replace(/,/g, '.'))
    );
  });
};
