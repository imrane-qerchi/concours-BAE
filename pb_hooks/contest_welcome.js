function extractFirstNameFromParticipant(record) {
  // essaie "prenom", puis "nom" (1er mot), puis email (partie avant @)
  const prenom = record?.get?.('prenom');
  if (typeof prenom === 'string' && prenom.trim()) return prenom.trim();

  const nom = record?.get?.('nom');
  if (typeof nom === 'string' && nom.trim()) return nom.trim().split(/\s+/)[0];

  const email = record?.get?.('email') || '';
  if (email) return email.split('@')[0].replace(/[._-]+/g, ' ');
  return '';
}

onRecordCreateRequest((e) => {
  // on laisse PocketBase créer le record d'abord
  e.next();

  // ne traite QUE la collection "participants"
  if (e.collection?.name !== 'participants') return;

  const rec = e.record;
  if (!rec) return;

  // Récupération des champs
  const toEmail = rec.get('email');
  if (!toEmail) {
    console.warn('[mail participants] email manquant, envoi annulé pour id=', rec.id);
    return;
  }

  const prenom = extractFirstNameFromParticipant(rec);
  const { senderAddress, senderName } = e.app.settings().meta;

  const subject = 'Merci pour ta participation au jeu concours "Success Road"';
  const tutoUrl = 'https://alumni.univ-fcomte.fr/fr/page/jeu-concours-success-road';

  const text = [
    `Bonjour ${prenom || ''},`,
    '',
    `Nous avons bien pris en compte ton inscription au tirage au sort du Jeu concours Success Road organisé à l'occasion du festival Bienvenue aux étudiants.`,
    `N'oublie de mettre à jour ton profil professionnel qui est associé à ton compte Alumni afin de remplir l'ensemble des conditions de participation.`,
    `Un tuto est disponible sur la page du jeu : ${tutoUrl}`,
    '',
    `Le tirage au sort aura lieu le 06 octobre prochain. Les heureux gagnants seront notifiés par email.`,
    '',
    `Nous te souhaitons bonne chance et une belle année universitaire.`,
    '',
    `A bientôt.`,
    `L'équipe du réseau Alumni`,
  ].join('\n');

  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
    <p>Bonjour ${prenom ? `<strong>${prenom}</strong>` : ''},</p>

    <p>
      Nous avons bien pris en compte ton inscription au tirage au sort du
      <strong>Jeu concours Success Road</strong> organisé à l'occasion du festival
      Bienvenue aux étudiants.
    </p>

    <p>
      N'oublie de mettre à jour ton <strong>profil professionnel</strong> qui est associé
      à ton compte Alumni afin de remplir l'ensemble des conditions de participation.
      Un tuto est disponible sur la page du jeu :
      <a href="${tutoUrl}" target="_blank" rel="noopener noreferrer">${tutoUrl}</a>
    </p>

    <p>
      Le tirage au sort aura lieu le <strong>06 octobre</strong> prochain.
      Les heureux gagnants seront notifiés par email.
    </p>

    <p>Nous te souhaitons bonne chance et une belle année universitaire.</p>

    <p style="margin-top:24px">
      À bientôt.<br/>
      <em>L'équipe du réseau Alumni</em>
    </p>
  </div>
  `;

  const msg = new MailerMessage({
    from: { address: senderAddress, name: senderName }, // "Réseau Alumni" <contact-success-road@univ-fcomte.fr>
    to: [{ address: toEmail }],
    subject,
    html,
    text,
    // bcc: [{ address: "copie-interne@univ-fcomte.fr" }], // optionnel
    // headers: { "X-Campaign": "success-road-inscription" }, // optionnel
  });

  try {
    e.app.newMailClient().send(msg);
  } catch (err) {
    console.error('[mail participants] erreur envoi:', err?.message || err);
  }
}, 'participants');
