import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getPersonDetail } from '../api/endpoints';
import { buildProfileUrl, POSTER_SIZES } from '../api/imageUrls';
import { useFetch } from '../hooks/useFetch';
import { MovieGrid } from '../components/movie/MovieGrid';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import './ActorDetailPage.css';

export function ActorDetailPage() {
  const { id } = useParams();
  const { data: person, isLoading, error, refetch } = useFetch(() => getPersonDetail(id), [id]);

  const filmography = useMemo(() => {
    if (!person) return [];
    const cast = person.movie_credits?.cast || [];
    const seenIds = new Set();
    const unique = [];
    for (const movie of cast) {
      if (!seenIds.has(movie.id)) {
        seenIds.add(movie.id);
        unique.push(movie);
      }
    }
    return unique.sort((a, b) => {
      const dateA = a.release_date || '';
      const dateB = b.release_date || '';
      return dateB.localeCompare(dateA);
    });
  }, [person]);

  if (isLoading) return <LoadingSpinner label="Loading actor…" />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;
  if (!person) return null;

  const profileUrl = buildProfileUrl(person.profile_path, POSTER_SIZES.large);

  return (
    <main className="container actor-detail">
      <nav className="actor-detail__breadcrumb" aria-label="Breadcrumb">
        Discover &gt; Actor &gt; {person.name}
      </nav>

      <section className="actor-detail__hero">
        <div className="actor-detail__photo-wrap">
          {profileUrl ? (
            <img className="actor-detail__photo" src={profileUrl} alt={`${person.name} photo`} />
          ) : (
            <div className="actor-detail__photo actor-detail__photo--placeholder">No image</div>
          )}
        </div>

        <div className="actor-detail__info">
          <div>
            <h1 className="actor-detail__name">{person.name}</h1>
            <p className="actor-detail__meta">
              {person.known_for_department && <>{person.known_for_department}</>}
              {person.popularity && (
                <>
                  {person.known_for_department && ' • '}
                  Popularity: {person.popularity.toFixed(1)}
                </>
              )}
            </p>
          </div>
          {person.biography && (
            <section className="card actor-detail__biography">
              <h2>Biography</h2>
              <p className="actor-detail__biography-text">{person.biography}</p>
            </section>
          )}
        </div>
      </section>

      {filmography.length > 0 && (
        <section className="card actor-detail__panel" aria-labelledby="filmography-heading">
          <h2 id="filmography-heading">Filmography</h2>
          <MovieGrid movies={filmography} emptyMessage="No movies found." />
        </section>
      )}
    </main>
  );
}
