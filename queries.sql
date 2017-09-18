select msas.geoid, msas.the_geom, msas.cartodb_id, ntd.num_agencies
from msas, ntd
where msas.geoid = ntd.geoid_msa
