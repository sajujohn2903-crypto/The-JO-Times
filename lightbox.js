/* Click any case study image to see it larger. Arrow keys and Esc work too. */
(function(){
  var imgs = [], idx = 0, box = null;
  function collect(){ imgs = Array.prototype.slice.call(document.querySelectorAll('#article-body figure img')).filter(function(i){ return i.src && i.naturalWidth > 0; }); }
  function build(){
    box = document.createElement('div');
    box.className = 'lb'; box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true'); box.setAttribute('aria-label','Image viewer'); box.hidden = true;
    box.innerHTML = '<button class="lb__x mono" type="button" aria-label="Close">Close &times;</button>' +
      '<button class="lb__nav lb__nav--prev mono" type="button" aria-label="Previous image">&larr;</button>' +
      '<figure class="lb__fig"><img alt=""><figcaption class="mono"></figcaption></figure>' +
      '<button class="lb__nav lb__nav--next mono" type="button" aria-label="Next image">&rarr;</button>';
    document.body.appendChild(box);
    box.addEventListener('click', function(e){
      if(e.target === box || e.target.classList.contains('lb__x')) close();
      else if(e.target.classList.contains('lb__nav--prev')) step(-1);
      else if(e.target.classList.contains('lb__nav--next')) step(1);
    });
  }
  function show(){
    var s = imgs[idx]; if(!s) return;
    var big = box.querySelector('.lb__fig img');
    big.src = s.currentSrc || s.src; big.alt = s.alt || '';
    box.querySelector('figcaption').textContent = (s.alt || '') + (imgs.length > 1 ? '   ' + (idx + 1) + ' / ' + imgs.length : '');
    box.classList.toggle('lb--single', imgs.length < 2);
  }
  function open(i){ if(!box) build(); idx = i; show(); box.hidden = false; document.body.classList.add('lb-open'); box.querySelector('.lb__x').focus(); }
  function close(){ if(!box) return; box.hidden = true; document.body.classList.remove('lb-open'); }
  function step(n){ idx = (idx + n + imgs.length) % imgs.length; show(); }
  document.addEventListener('click', function(e){
    var t = e.target;
    if(!(t.tagName === 'IMG' && t.closest('#article-body figure'))) return;
    collect(); var i = imgs.indexOf(t); if(i > -1) open(i);
  });
  document.addEventListener('keydown', function(e){
    if(!box || box.hidden) return;
    if(e.key === 'Escape') close();
    else if(e.key === 'ArrowLeft') step(-1);
    else if(e.key === 'ArrowRight') step(1);
  });
})();
