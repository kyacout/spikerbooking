# frozen_string_literal: true

puts 'Creating artist profiles'

user = User.find_or_create_by(email: 'dpspeicher86@gmail.com') do |u|
  u.password = 'anbdle34'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Daniel', last_name: 'Speicher', minimum_budget: '$200-$299', artist_name: 'Danny Vintage',
    location: 'IL, Crystal Lake', genres: ['EDM/Dance', 'Party/Pop', 'Open to Ideas'],
    unique_statement: "DJ services to Rock the House! Danny Vintage will get your event moving whether it's a Friday
    night at the club, wedding, or corporate event.",
    biography: "DJ services to Rock the House! Danny Vintage will get your event moving whether it's a Friday night at
    the club, wedding, or corporate event. With a 20K song list he’ll work with you to put together the right mix for
    your party",
    facebook_url: 'https://www.facebook.com/therealdannyvintage',
    instagram_url: 'https://www.instagram.com/therealdannyvintage',
    completed: true
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Dan_Speicher_DannyVintage.png'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/DannyVintage/DannyVintage_1.jpeg'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/DannyVintage/DannyVintage_2.jpeg'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/DannyVintage/DannyVintage_3.jpeg'),
    filename: 'file.png'
  )
end
puts 'Artist 1 created'

user = User.find_or_create_by(email: 'larabellmusic@gmail.com') do |u|
  u.password = 'anbdle34'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Lara', last_name: 'Bell', minimum_budget: '$200-$299', artist_name: 'Lara Bell',
    location: 'Chicago, IL', genres: %w[Acoustic Country Folk Rock Pop],
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
    completed: true
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Lara_Bell_LaraBell.png'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/LaraBell/LauraBell_1.jpeg'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/LaraBell/LauraBell_2.jpeg'),
    filename: 'file.png'
  )
end
puts 'Artist 2 created'

user = User.find_or_create_by(email: 'wadebofficial@gmail.com') do |u|
  u.password = 'anbdle34'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Wade Lee', last_name: 'Berry', minimum_budget: '$200-$299', artist_name: 'Karen Shook',
    location: 'Chicago, IL', genres: %w[Acoustic Bluegrass Country Soul Reggae],
    unique_statement: "Soul rocker-The fabulous one woman musical show-playing originals and covering only the good
      songs, from Johnny Cash to Bob Marley",
    biography: "The fabulous one woman musical show-playing originals and covering only the good songs, from Johnny Cash
       to Bob Marley.",
    facebook_url: 'https://www.facebook.com/WadeBOfficial',
    instagram_url: 'https://www.instagram.com/wadebmusic',
    spotify_url: 'https://open.spotify.com/artist/6SRngj3jZv4ZH2HDHWMrdQ?si=S-Dj3QeXSXuIV7RYZyw29g',
    youtube_url: 'https://www.youtube.com/channel/UCuMfKavYCQ8dc-jhyydDIlA',
    completed: true
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Wade_Berry_WadeB.png'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/Wade B/WadeB_1.jpeg'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/Wade B/WadeB_2.jpeg'),
    filename: 'file.png'
  )
end
puts 'Artist 3 created'

user = User.find_or_create_by(email: 'karensingsthehits@gmail.com') do |u|
  u.password = 'anbdle34'
end
if ArtistProfile.where(user: user).first.blank?
  artist_profile = ArtistProfile.create(
    user: user, first_name: 'Karen', last_name: 'Shook', minimum_budget: '$1000+', artist_name: 'Karen Shook',
    location: 'Chicago, IL', genres: %w[Acoustic Bluegrass Country Soul Reggae],
    unique_statement: "Soul rocker-The fabulous one woman musical show-playing originals and covering only the good
      songs, from Johnny Cash to Bob Marley",
    biography: "The fabulous one woman musical show-playing originals and covering only the good songs, from Johnny
      Cash to Bob Marley",
    facebook_url: 'https://www.facebook.com/karen.slavin.3',
    instagram_url: 'https://www.instagram.com/karenshookmusic',
    youtube_url: 'https://www.youtube.com/channel/UCjDzWTRbdGrjW9M3cEwomAg',
    completed: true
  )
  artist_profile.profile_photo.attach(
    io: File.open('db/seeds/images/artists_profile_pictures/Karen_Shook_KarenShook.png'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/KarenShook/KarenShook_1.jpeg'),
    filename: 'file.png'
  )
  artist_profile.photos.attach(
    io: File.open('db/seeds/images/artists_photos/KarenShook/KarenShook_2.jpeg'),
    filename: 'file.png'
  )
end
puts 'Artist 4 created'

# venue_profile = VenueProfile.create(
#   user: user,
#   name: 'D.C. Cobb\'s Woodstock',
#   location: '226 Main St. Woodstock, IL',
#   website: 'http://www.dccobbs.net/',
#   capacity: '100',
#   zip_code: '60098'
# )
# venue_profile.photo.attach(
#   io: File.open('db/seeds/images/venue_photos/DCCobbsLogo.jpg'),
#   filename: 'DCCobbsLogo.jpg'
# )
#
# venue_profile = VenueProfile.create(
#   user: user,
#   name: 'The Cottage',
#   location: '6 E. Crystal Lake Ave. Crystal Lake, IL',
#   website: 'http://www.thecottagepub.net/',
#   capacity: '100',
#   zip_code: '60014'
# )
# venue_profile.photo.attach(
#   io: File.open('db/seeds/images/venue_photos/TheCottage_logo.jpg'),
#   filename: 'TheCottage_logo.jpg'
# )
#
# venue_profile = VenueProfile.create(
#   user: user,
#   name: 'Cantina 52',
#   location: '52 Brink St. Crystal Lake, IL',
#   website: 'http://www.cantina52.com/',
#   capacity: '100',
#   zip_code: '60014'
# )
# venue_profile.photo.attach(
#   io: File.open('db/seeds/images/venue_photos/Cantina52_logo.jpg'),
#   filename: 'Cantina52_logo.jpg'
# )
#
# venue_profile = VenueProfile.create(
#   user: user,
#   name: 'Hart\'s Saloon',
#   location: '9932 Main St. Hebron, IL',
#   website: 'http://www.hartssaloon.com/',
#   capacity: '100',
#   zip_code: '60034'
# )
# venue_profile.photo.attach(
#   io: File.open('db/seeds/images/venue_photos/Hart\'sSaloon_logo.png'),
#   filename: 'Hart\'sSaloon_logo.png'
# )
