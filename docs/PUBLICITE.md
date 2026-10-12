# Publicité Google AdSense

- Éditeur AdSense : `pub-2680784147246798` (public par conception : il est dans `public/ads.txt` et dans le code des pages).
- Code AdSense et balise `google-adsense-account` : `src/app/layout.tsx`, identifiant dans `src/lib/config.ts` (`ADSENSE_CLIENT`).
  Vider `NEXT_PUBLIC_ADSENSE_CLIENT` retire tout script Google du site.
- `public/ads.txt` : ligne exacte donnée par AdSense.
- CSP (`public/_headers`) : seuls les domaines Google nécessaires aux annonces et au bandeau de consentement sont autorisés.
- Bandeau de consentement : outil « Confidentialité et messages » d'AdSense (message « Réglementations européennes »),
  chargé par le code AdSense, sans code en plus. Lien « Gérer mes cookies » en pied de page (`CookieSettingsLink`).
- Annonces automatiques : désactivées pour keurbook.com. On utilise des emplacements choisis (`AdSlot`) :

| Page | Annonces | Emplacement |
|---|---|---|
| Fiche livre / BD | 1 | fin de fiche, loin du bouton Amazon |
| Fiche auteur | 1 | après la biographie, avant ses livres |
| Page pays | 1 | après les portraits d'écrivains |
| Article Conseils | 2 | au milieu du texte (articles de 3 parties ou plus), puis en fin de page |
| Accueil, listes, pile à lire, pages légales, 404 | 0 | — |

- Les identifiants des blocs d'annonces se règlent dans `ADSENSE_SLOTS` (`src/lib/config.ts`) ou par les variables
  `NEXT_PUBLIC_ADSENSE_SLOT_FICHE`, `_AUTEUR`, `_PAYS`, `_ARTICLE`. Sans identifiant, l'emplacement n'affiche rien.
- Habillage : classes `.ad-slot` et `.ad-slot-label` dans `src/app/globals.css`, volontairement neutres (à reprendre
  avec le design définitif). Mention « Publicité » toujours visible ; repli si Google n'a pas d'annonce.
