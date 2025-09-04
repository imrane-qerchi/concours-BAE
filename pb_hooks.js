onRecordCreateRequest(async (e) => {
  console.log("➡️ Hook déclenché pour l'inscription :", e.record.get('email'))
  e.next() // Continue l'enregistrement du participant

  const prenom = e.record.get('prenom') || 'participant'
  const email = e.record.get('email')

  if (!email) {
    console.warn('Aucun email fourni, email non envoyé.')
    return
  }

  const message = new MailerMessage({
    from: {
      address: e.app.settings().meta.senderAddress,
      name: e.app.settings().meta.senderName
    },
    to: [{ address: email }],
    subject: 'Merci pour ta participation au jeu concours "Success Road"',
    html: `
            <p>Bonjour ${prenom},</p>

            <p>Nous avons bien pris en compte ton inscription au tirage au sort du Jeu concours <strong>Success Road</strong> organisé à l'occasion du festival <strong>Bienvenue aux étudiants</strong>.</p>

            <p>N'oublie de mettre à jour ton profil professionnel qui est associé à ton compte Alumni afin de remplir l'ensemble des conditions de participation.</p>

            <p>Un tuto est disponible sur la page du jeu : <a href="https://alumni.univ-fcomte.fr/fr/page/jeu-concours-success-road">Voir le tuto</a></p>

            <p>Le tirage au sort aura lieu le <strong>06 octobre</strong>. Les heureux gagnants seront notifiés par email.</p>

            <p>Nous te souhaitons bonne chance et une belle année universitaire !</p>

            <p>À bientôt,<br>L'équipe du réseau Alumni</p>
        `
  })

  await e.app.newMailClient().send(message)
}, 'participants') // <== nom exact de ta collection
