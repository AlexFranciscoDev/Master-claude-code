import { buildProfileUrl } from '../../api/imageUrls';
import './CastRow.css';

export function CastRow({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <ul className="cast-row">
      {cast.slice(0, 10).map((member) => {
        const profileUrl = buildProfileUrl(member.profile_path);
        return (
          <li key={member.cast_id ?? member.id} className="cast-row__item">
            {profileUrl ? (
              <img className="cast-row__photo" src={profileUrl} alt={member.name} />
            ) : (
              <div className="cast-row__photo cast-row__photo--placeholder">No photo</div>
            )}
            <p className="cast-row__name">{member.name}</p>
            <p className="cast-row__character">{member.character}</p>
          </li>
        );
      })}
    </ul>
  );
}
