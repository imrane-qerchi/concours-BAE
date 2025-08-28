console.log('[hooks] participants.mail.js chargé');

// Envoie un e-mail de confirmation dès qu'un record est créé dans "participants".

onRecordCreateRequest((e) => {
  // Laisse PocketBase créer le record
  e.next();

  try {
    // Récup champs (fallback si pas de getter .get)
    const get = (rec, k, d = "") => (rec?.get ? rec.get(k) ?? d : rec?.[k] ?? d);

    const to = get(e.record, "email", "");
    const prenom = get(e.record, "prenom", "");

    if (!to) {
      e.app.logger().warn('[mail] participants créé sans email, id=' + (e.record?.id || '?'));
      return;
    }

    const subject = 'Merci pour ta participation au jeu concours "Success Road"';
    const html = renderHtml(prenom);
    const text = renderText(prenom);

    const message = new MailerMessage({
      from: {
        address: e.app.settings().meta.senderAddress, // défini dans Mail settings
        name:    e.app.settings().meta.senderName,
      },
      to:      [{ address: to }],
      subject: subject,
      html:    html,
      text:    text,
      // headers/bcc/cc possibles ici si besoin
    });

    e.app.newMailClient().send(message);
    e.app.logger().info('[mail] envoyé à ' + to);
  } catch (err) {
    e.app.logger().error('[mail] échec envoi: ' + err);
  }
}, "participants");

// ---------- Templates (sans images pour le test) ----------
function renderHtml(prenomRaw) {
  const prenom = escapeHtml(prenomRaw || "");
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Merci pour ta participation</title>
    <style>
      body,table,td,p{margin:0;padding:0} a{color:#0B5FFF;text-decoration:underline}
      .wrap{width:100%;background:#f6f7fb}.container{width:100%;max-width:600px;margin:0 auto}
      .card{background:#fff;border-radius:8px}.content{padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111;font-size:16px;line-height:1.5}
      .h1{font-size:22px;font-weight:bold;margin:0 0 12px 0}.muted{color:#555;font-size:14px}
      @media (prefers-color-scheme: dark){.card{background:#111316}.content{color:#e8eaf2}.muted{color:#b9c0d4}}
    </style>
  </head>
  <body class="wrap">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" class="container" cellspacing="0" cellpadding="0">
            <tr>
              <td class="card">
                <div class="content">
                  <p class="h1">Merci pour ta participation au jeu concours « Success Road »</p>
                  <p>Bonjour ${prenom},</p>

                  <p>Nous avons bien pris en compte ton inscription au tirage au sort du Jeu concours Success Road organisé à l'occasion du festival Bienvenue aux étudiants.</p>

                  <p>N'oublie pas de mettre à jour ton profil professionnel associé à ton compte Alumni afin de remplir l'ensemble des conditions de participation.</p>

                  <p>Un tuto est disponible sur la page du jeu :<br>
                    <a href="https://alumni.univ-fcomte.fr/fr/page/jeu-concours-success-road">
                      https://alumni.univ-fcomte.fr/fr/page/jeu-concours-success-road
                    </a>
                  </p>

                  <p>Le tirage au sort aura lieu le <strong>06 octobre</strong>. Les heureux gagnants seront notifiés par e-mail.</p>

                  <p class="muted">Nous te souhaitons bonne chance et une belle année universitaire.</p>

                  <p>À bientôt,<br>L'équipe du réseau Alumni</p>
                </div>
              </td>
            </tr>
            <tr><td height="16"></td></tr>
            <tr>
              <td style="font:12px Arial,Helvetica,sans-serif; color:#555; text-align:center;">
                Message transactionnel · Université de Franche-Comté – Réseau Alumni
              </td>
            </tr>
            <tr><td height="8"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(prenom) {
  return `Objet : Merci pour ta participation au jeu concours "Success Road"

Bonjour ${prenom || ""},

Nous avons bien pris en compte ton inscription au tirage au sort du Jeu concours Success Road organisé à l'occasion du festival Bienvenue aux étudiants.

N'oublie pas de mettre à jour ton profil professionnel associé à ton compte Alumni afin de remplir l'ensemble des conditions de participation.

Tuto : https://alumni.univ-fcomte.fr/fr/page/jeu-concours-success-road

Le tirage au sort aura lieu le 06 octobre. Les heureux gagnants seront notifiés par e-mail.

Nous te souhaitons bonne chance et une belle année universitaire.

À bientôt.
L'équipe du réseau Alumni`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
