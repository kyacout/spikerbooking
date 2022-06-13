# frozen_string_literal: true

puts 'Creating artist profiles'

user = User.find_or_create_by(email: 'dpspeicher86@gmail.com') do |u|
  u.password = 'anbdle34'
  u.current_type = 'artist'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Daniel', last_name: 'Speicher', phone: '010000000', minimum_budget: '$200-$299', artist_name: 'Danny Vintage',
    location: 'IL, Crystal Lake', genres: ['EDM/Dance', 'Party/Pop', 'Open to Ideas'],
    zip_code:"2345",
    unique_statement: "DJ services to Rock the House! Danny Vintage will get your event moving whether it's a Friday
    night at the club, wedding, or corporate event.",
    biography: "DJ services to Rock the House! Danny Vintage will get your event moving whether it's a Friday night at
    the club, wedding, or corporate event. With a 20K song list he’ll work with you to put together the right mix for
    your party",
    facebook_url: 'https://www.facebook.com/therealdannyvintage',
    instagram_url: 'https://www.instagram.com/therealdannyvintage',
    spotify_url: 'https://open.spotify.com/track/69sdMrbcCdptl5bUYpShr0',
    soundcloud_url: 'https://www.soundcloud.com/therealdannyvintage',
    tiktok_url: 'https://www.tiktok.com/therealdannyvintage',
    twitter_url: 'https://www.twitter.com/therealdannyvintage',
    youtube_url: 'https://www.youtube.com/therealdannyvintage',
    apple_music_url: 'https://www.music.apple.com/therealdannyvintage',
    tidal_url: 'https://www.tidal.com/therealdannyvintage',
    completed: true,
    hidden: false
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Dan_Speicher_DannyVintage.png'),
    filename: 'Dan_Speicher_DannyVintage.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/DannyVintage/DannyVintage_1.jpeg'),
    filename: 'DannyVintage_1.jpeg'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/DannyVintage/DannyVintage_2.jpeg'),
    filename: 'DannyVintage_2.jpeg'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/DannyVintage/DannyVintage_3.jpeg'),
    filename: 'DannyVintage_3.jpeg'
  )
end
puts 'Artist 1 created'

user = User.find_or_create_by(email: 'larabellmusic@gmail.com') do |u|
  u.password = 'anbdle34'
  u.current_type = 'artist'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Lara', last_name: 'Bell', phone: '010000000', minimum_budget: '$200-$299', artist_name: 'Lara Bell',
    location: 'Chicago, IL', genres: %w[Acoustic Country Folk Rock Pop],
    zip_code:"2345",
    unique_statement: "Singer/songwriter and professional actress. Audiences often mention how expressive she is
    onstage, and how her musical theatre training shines through when entertaining a crowd.",
    biography: "Country artist Lara Bell is a singer/songwriter from the northern Illinois area. She was born and raised
    with southern inspired roots, and since she was 16 years old, has performed hundreds of live shows between
    Chicagoland and Southern WI at various well known venues. (The RocHaus, Uncommom Ground, The Raue Center for the
    Arts, Durty Nellies, Homegrown Arts and Music Festival, The Lake Geneva House of Music, Nikos Red Mill Tavern,
    Racine County Fair, Walworth County Fair, Starline Art Factory, and many more).
    Lara is an accomplished musician of classical piano, acoustic guitar, and ukulele. Her genre diversity always
    captures the crowds attention. From country, to rock, to folk, to pop, she can do just about anything to please an
    audience. Fans have compared Lara’s voice to the queen of country music herself, Miss Dolly Parton, along with
    Miranda Lambert, Jewel, Ingrid Michaeslon, Brandi Carlile, Alanis Morissette, and Joni Mitchell.
    Along with being a songwriter and gig performer, Lara is also a professional actress/EMC cardholder in the
    Chicagoland area, and has been training as a triple threat since she was 5 years old. Audiences often mention how
    expressive she is onstage, and how her musical theatre training shines through when entertaining a crowd.",
    facebook_url: 'https://www.facebook.com/larabellmusic',
    instagram_url: 'https://www.instagram.com/larisa_bells',
    youtube_url: 'https://www.youtube.com/c/AcousticLara',
    spotify_url: 'https://www.spotify.com/larabellmusic',
    soundcloud_url: 'https://www.soundcloud.com/larabellmusic',
    tiktok_url: 'https://www.tiktok.com/larabellmusic',
    twitter_url: 'https://www.twitter.com/larabellmusic',
    apple_music_url: 'https://www.apple-music.com/larabellmusic',
    tidal_url: 'https://www.tidal.com/larabellmusic',
    completed: true,
    hidden: false
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Lara_Bell_LaraBell.png'),
    filename: 'Lara_Bell_LaraBell.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/LaraBell/LauraBell_1.jpeg'),
    filename: 'LauraBell_1.jpeg'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/LaraBell/LauraBell_2.jpeg'),
    filename: 'LauraBell_2.jpeg'
  )
end
puts 'Artist 2 created'

user = User.find_or_create_by(email: 'wadebofficial@gmail.com') do |u|
  u.password = 'anbdle34'
  u.current_type = 'artist'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Wade Lee', last_name: 'Berry', phone: '010000000', minimum_budget: '$200-$299', artist_name: 'Karen Shook',
    location: 'Chicago, IL', genres: %w[Acoustic Bluegrass Country Soul Reggae],
    zip_code:"2345",
    unique_statement: "Soul rocker-The fabulous one woman musical show-playing originals and covering only the good
      songs, from Johnny Cash to Bob Marley",
    biography: "The fabulous one woman musical show-playing originals and covering only the good songs, from Johnny Cash
       to Bob Marley.",
    facebook_url: 'https://www.facebook.com/WadeBOfficial',
    instagram_url: 'https://www.instagram.com/wadebmusic',
    spotify_url: 'https://open.spotify.com/artist/6SRngj3jZv4ZH2HDHWMrdQ?si=S-Dj3QeXSXuIV7RYZyw29g',
    youtube_url: 'https://www.youtube.com/channel/UCuMfKavYCQ8dc-jhyydDIlA',
    completed: true,
    hidden: false
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Wade_Berry_WadeB.png'),
    filename: 'Wade_Berry_WadeB.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/Wade B/WadeB_1.jpeg'),
    filename: 'WadeB_1.jpeg'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/Wade B/WadeB_2.jpeg'),
    filename: 'WadeB_2.jpeg'
  )
end
puts 'Artist 3 created'

user = User.find_or_create_by(email: 'karensingsthehits@gmail.com') do |u|
  u.password = 'anbdle34'
  u.current_type = 'artist'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Karen', last_name: 'Shook', phone: '010000000', minimum_budget: '$1000+', artist_name: 'Karen Shook',
    location: 'Chicago, IL', genres: %w[Acoustic Bluegrass Country Soul Reggae],
    zip_code:"2345",
    unique_statement: "Soul rocker-The fabulous one woman musical show-playing originals and covering only the good
      songs, from Johnny Cash to Bob Marley",
    biography: "The fabulous one woman musical show-playing originals and covering only the good songs, from Johnny
      Cash to Bob Marley",
    facebook_url: 'https://www.facebook.com/karen.slavin.3',
    instagram_url: 'https://www.instagram.com/karenshookmusic',
    youtube_url: 'https://www.youtube.com/channel/UCjDzWTRbdGrjW9M3cEwomAg',
    completed: true,
    hidden: false
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Karen_Shook_KarenShook.png'),
    filename: 'Karen_Shook_KarenShook.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/KarenShook/KarenShook_1.jpeg'),
    filename: 'KarenShook_1.jpeg'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/KarenShook/KarenShook_2.jpeg'),
    filename: 'KarenShook_2.jpeg'
  )
end
puts 'Artist 4 created'

user = User.find_or_create_by(email: 'Woodstock@gmail.com') do |u|
  u.password = 'Cobb'
  u.current_type = 'venue'
end

venue_profile = VenueProfile.create(
  user: user,
  name: 'D.C. Cobb\'s Woodstock',
  location: '226 Main St. Woodstock, IL',
  website: 'http://www.dccobbs.net/',
  capacity: '100',
  zip_code: '60098',
  hidden: false
)

venue_profile.photo.attach(
  io: File.open('db/seeds/images/venue_photos/DCCobbsLogo.jpg'),
  filename: 'DCCobbsLogo.jpg',
)

puts 'Venue 1 created'

user = User.find_or_create_by(email: 'cottagepub@gmail.com') do |u|
  u.password = 'Cottage'
  u.current_type = 'venue'
end

venue_profile = VenueProfile.create(
  user: user,
  name: 'The Cottage',
  location: '6 E. Crystal Lake Ave. Crystal Lake, IL',
  website: 'http://www.thecottagepub.net/',
  capacity: '100',
  zip_code: '60014',
  hidden: false
)
venue_profile.photo.attach(
  io: File.open('db/seeds/images/venue_photos/TheCottage_logo.jpg'),
  filename: 'TheCottage_logo.jpg'
)

puts 'Venue 2 created'

user = User.find_or_create_by(email: 'cantina52@gmail.com') do |u|
  u.password = 'Cantina'
  u.current_type = 'venue'
end

venue_profile = VenueProfile.create(
  user: user,
  name: 'Cantina 52',
  location: '52 Brink St. Crystal Lake, IL',
  website: 'http://www.cantina52.com/',
  capacity: '100',
  zip_code: '60014',
  hidden: false
)
venue_profile.photo.attach(
  io: File.open('db/seeds/images/venue_photos/Cantina52_logo.jpg'),
  filename: 'Cantina52_logo.jpg'
)

puts 'Venue 3 created'

user = User.find_or_create_by(email: 'hartssaloon@gmail.com') do |u|
  u.password = 'Hart'
  u.current_type = 'venue'
end

venue_profile = VenueProfile.create(
  user: user,
  name: 'Hart\'s Saloon',
  location: '9932 Main St. Hebron, IL',
  website: 'http://www.hartssaloon.com/',
  capacity: '100',
  zip_code: '60034',
  hidden: false
)
venue_profile.photo.attach(
  io: File.open('db/seeds/images/venue_photos/Hart\'sSaloon_logo.png'),
  filename: 'sSaloon_logo.png'
)

puts 'Venue 4 created'
