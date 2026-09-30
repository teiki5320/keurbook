import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CookieSettingsButton } from "@/components/compliance/CookieBanner";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Données personnelles et cookies sur Keurbook : ce qui est collecté, pourquoi, et vos droits.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="30 septembre 2026">
      <p>
        {legalConfig.companyName} (« nous ») attache une grande importance à la protection de vos données personnelles,
        traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
        Libertés.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {legalConfig.companyName}, {legalConfig.address}. Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Données collectées et finalités</h2>
      <p>
        Le site ne comporte ni compte, ni formulaire, ni outil de mesure d&apos;audience : nous ne collectons aucune
        donnée personnelle en dehors des cas suivants.
      </p>
      <ul>
        <li>
          <strong>Messages envoyés à l&apos;adresse de contact</strong> : votre adresse e-mail et le contenu de votre
          message, pour vous répondre. Base légale : intérêt légitime (répondre à votre demande).
        </li>
        <li>
          <strong>Journaux techniques de l&apos;hébergeur</strong> : comme tout site, l&apos;hébergeur ({legalConfig.hostName})
          traite l&apos;adresse IP et les informations techniques de connexion pour délivrer les pages et protéger le site
          contre les attaques. Base légale : intérêt légitime (sécurité du site).
        </li>
      </ul>
      <p>Nous ne revendons jamais vos données. Le lien « Partager ma pile à lire » ne contient que les titres choisis, sans donnée personnelle.</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Messages de contact : le temps de traiter la demande, puis 3 ans au plus.</li>
        <li>Journaux techniques : selon la politique de l&apos;hébergeur, quelques jours en général.</li>
        <li>Mémorisation du message sur les cookies : 6 mois.</li>
        <li>Pile à lire : dans votre navigateur uniquement, jusqu&apos;à ce que vous les retiriez ou effaciez les données du site.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à nos services internes et à nos sous-traitants techniques : hébergement du site et
        acheminement des e-mails de contact ({legalConfig.hostName}), messagerie (IONOS). Lorsque des données sont
        transférées hors de l&apos;Union européenne (Cloudflare, États-Unis), ce transfert est encadré par le cadre de
        protection des données UE–États-Unis (Data Privacy Framework) et par des clauses contractuelles types de la
        Commission européenne.
      </p>

      <h2>Liens vers Amazon</h2>
      <p>
        Les boutons « Acheter sur Amazon » ouvrent Amazon.fr avec notre identifiant de partenaire, qui permet à Amazon de nous
        rémunérer sur les achats. Nous ne recevons aucune donnée personnelle de votre part à cette occasion. Sur Amazon,
        vos données et les cookies déposés relèvent de la politique de confidentialité d&apos;Amazon.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
        et de portabilité de vos données, ainsi que du droit de définir des directives relatives à leur sort après votre
        décès. Pour les exercer : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Vous
        pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>Le site utilise les cookies et stockages locaux suivants :</p>
      <ul>
        <li><strong>Pile à lire</strong> (stockage local, nécessaire) — conserve les livres que vous avez mis de côté, jusqu&apos;à ce que vous les retiriez ou effaciez les données du site.</li>
        <li><strong>kb_consent</strong> (nécessaire) — mémorise que vous avez vu le message sur les cookies, 6 mois.</li>
      </ul>
      <p>
        Le site ne dépose aucun cookie de mesure d&apos;audience ni publicitaire. Amazon.fr, une fois ouvert, dépose ses
        propres cookies. Vous pouvez
        afficher à nouveau le message sur les cookies à tout moment : <CookieSettingsButton className="font-semibold text-accent underline" />.
      </p>
    </LegalPage>
  );
}
