using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivitiesAttendee
                            .Where(x => x.AppUser.UserName == request.Username)
                            .OrderBy(x => x.Activity.DateTime)
                            .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                            .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.DateTime <= DateTime.UtcNow),
                    "hosting" => query.Where(a => a.HostUsername ==
                   request.Username),
                    _ => query.Where(a => a.DateTime >= DateTime.UtcNow)
                };


                var activities = await query.ToListAsync();

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}
