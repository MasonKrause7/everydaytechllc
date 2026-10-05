import { useState } from 'react'
import { FaPlay } from 'react-icons/fa6'
import '../styles/components/ProjectGallery.css'

export type Media = {
  src: string
  alt: string
  type?: 'image' | 'video'
  poster?: string
}

type Props = {
  images: Media[]
}

function ProjectGallery({ images }: Props) {
  const [active, setActive] = useState(0)
  const current = images[active]

  return (
    <div className="gallery">
      <figure className="gallery__featured">
        {current.type === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            aria-label={current.alt}
            className="gallery__image gallery__image--video"
            autoPlay
            muted
            playsInline
            controls
          />
        ) : (
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="gallery__image"
            loading="lazy"
          />
        )}
        <figcaption className="gallery__caption">{current.alt}</figcaption>
      </figure>

      {images.length > 1 && (
        <ul className="gallery__thumbs">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                className={`gallery__thumb${index === active ? ' gallery__thumb--active' : ''}`}
                aria-label={`Show ${image.alt}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                <img src={image.poster ?? image.src} alt="" loading="lazy" />
                {image.type === 'video' && (
                  <span className="gallery__play">
                    <FaPlay />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProjectGallery
